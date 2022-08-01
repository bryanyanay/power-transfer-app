import Layout from "../components/layout";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { prisma } from '../utils/db';

import styles from '../styles/history.module.css';
import Table from '../components/table';

export default function History({ rTxs, dTxs }) {
  console.log(rTxs);

  if (rTxs.length) {
    rTxs = rTxs.map((tx) => {
      return (
        <tr key={tx.id}>
          <td>{tx.id}</td>
          <td>{tx.start}</td>
          <td>{tx.stop}</td>
          <td>{tx.rId}</td>
          <td>{tx.dId}</td>
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
          <td>{tx.dId}</td>
          <td>{tx.rId}</td>
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
    vehicles.vehicles.forEach(async (v) => {
      const currRTxs = await prisma.tx.findMany({
        where: { rId: v.id },
        include: { donor: true, recipient: true }
      });
      if (currRTxs) {
        rTxs.push(...currRTxs);
      } 
    });
    vehicles.vehicles.forEach(async (v) => {
      const currDTxs = await prisma.tx.findMany({
        where: { dId: v.id },
        include: { donor: true, recipient: true }
      });
      if (currDTxs) {
        dTxs.push(...currDTxs);
      } 
    });
    console.log(rTxs);
    return { props: {rTxs: rTxs, dTxs: dTxs} };
  }
});