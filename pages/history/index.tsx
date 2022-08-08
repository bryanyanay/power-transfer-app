import Layout from "../../components/layout";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { prisma } from '../../utils/db';

import styles from '../styles/history.module.css';
import Table from '../../components/table';

export default function History({ rTxs, dTxs }) {
  if (rTxs.length) {
    rTxs = rTxs.map((tx) => {
      return (
        <tr key={tx.id}>
          <td>{tx.id}</td>
          <td>{tx.start}</td>
          <td>{tx.stop}</td>
          <td>{tx.recipient.license} <em>({tx.rId})</em></td>
          <td>{tx.donor.license} <em>({tx.dId})</em></td>
          <td>{tx.kWhTransferred}</td>
        </tr>
      );
    })
  } else {
    rTxs = <tr key={0}><td>No Transactions</td><td></td><td></td><td></td><td></td><td></td></tr>
  }

  if (dTxs.length) {
    dTxs = dTxs.map((tx) => {
      return (
        <tr key={tx.id}>
          <td>{tx.id}</td>
          <td>{tx.start}</td>
          <td>{tx.stop}</td>
          <td>{tx.donor.license} <em>({tx.dId})</em></td>
          <td>{tx.recipient.license} <em>({tx.rId})</em></td>
          <td>{tx.kWhTransferred}</td>
        </tr>
      );
    })
  } else {
    dTxs = <tr key={0}><td>No Transactions</td><td></td><td></td><td></td><td></td><td></td></tr>
  }


  return (
    <Layout title="Your History">
      <h2 className={styles["table-title"]}>Power Received</h2>
      <Table wide cols={["Transaction ID", "Start", "Stop", "Your Vehicle", "Received From", "Amt Transferred (kWh)"]}>
        {rTxs}
      </Table>

      <h2 className={styles["table-title"]}>Power Donated</h2>
      <Table wide cols={["Transaction ID", "Start", "Stop", "Your Vehicle", "Donated To", "Amt Transferred (kWh)"]}>
        {dTxs}
      </Table>
    </Layout>
  );
}

export const getServerSideProps : GetServerSideProps = withPageAuthRequired({
  async getServerSideProps({req, res}) {
    const { user } = getSession(req, res);
    const vehicles = await prisma.user.findUnique({
      where: { email: user.email },
      select: { vehicles: true }
    });

    if (!vehicles) return { props: {rTxs: [], dTxs: []} };

    let rTxs = [];
    let dTxs = [];

    const addRTxs = async (v) => {
      const currRTxs = await prisma.tx.findMany({
        where: { rId: v.id },
        include: { donor: true, recipient: true }
      });
      rTxs.push(...currRTxs);
    };
    for (const v of vehicles.vehicles) await addRTxs(v); //must be for loops, not forEach, since that doesn't work properly with async/await [see: https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop]
    
    const addDTxs = async (v) => {
      const currDTxs = await prisma.tx.findMany({
        where: { dId: v.id },
        include: { donor: true, recipient: true }
      });
      dTxs.push(...currDTxs);
    };
    for (const v of vehicles.vehicles) await addDTxs(v);

    /* prisma's Date type, as well as its Decimal type can't be passed thru props since 
    next.js requires it to be serializable but its not, so we do some JSON stuff to force it 
    to be serializable?? idk how this works tbh 
     - see: https://stackoverflow.com/questions/70449092/reason-object-object-date-cannot-be-serialized-as-json-please-only-ret
    */
    return { props: {rTxs: JSON.parse(JSON.stringify(rTxs)), dTxs: JSON.parse(JSON.stringify(dTxs))} };
  }
});