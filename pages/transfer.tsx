import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import { useState } from 'react';
import styles from '../styles/transfer.module.css';
import btnStyles from '../styles/button.module.css';

import { prisma } from '../utils/db';


export default function Transfer({userVehicles, allVehicles}) {
  const [donor, setDonor] = useState("");
  const [recipient, setRecipient] = useState("");
  const [txInP, setTxInP] = useState(false);

  const startTx = async () => {
    await fetch('/api/transfer', {
      method: 'POST',
      body: JSON.stringify({
        action: "START",
        rId: recipient,
        dId: donor
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setTxInP(true);
  }
  const stopTx = async () => {
    await fetch('/api/transfer', {
      method: 'POST',
      body: JSON.stringify({
        action: "STOP",
        rId: recipient,
        dId: donor
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setTxInP(false);
  }

  return (
    <Layout title="Transfer Power">
      <form className={styles.layout}>
        <div className={styles.select}>
          <label htmlFor="donor-select">Choose one of your vehicles to donate power:</label>
          <select disabled={txInP} value={donor} name="donor" id="donor-select" onChange={(e) => { setDonor(e.target.value); }}>
            <option value="">--Please choose an option--</option>
            {
              userVehicles.map((v) => {
                return <option key={v.id} value={v.id}>license: {v.license}, id: {v.id}</option>
              })
            }
          </select>
        </div>
        <div className={styles.select}>
          <label htmlFor="recipient-select">Choose a vehicle to receive power:</label>
          <select disabled={txInP} value={recipient} name="recipient" id="recipient-select" onChange={(e) => { setRecipient(e.target.value); }}>
            <option value="">--Please choose an option--</option>
            {
              allVehicles.map((v) => {
                return <option key={v.id} value={v.id}>license: {v.license}, id: {v.id}</option>
              })
            }
          </select>
        </div>
        {txInP ? 
        <button className={btnStyles.button} type="button" onClick={stopTx}>Stop Transfer</button>
          :
        <button className={btnStyles.button} type="button" onClick={startTx}>Start Transfer</button>
        }
    </form>
    {txInP && <p className={styles.msg}>Transferring...</p>}
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { user } = getSession(req, res);
    const userVehicles = await prisma.user.findUnique({
      where: { email: user.email },
      select: { vehicles: true }
    });

    let allVehicles = await prisma.vehicle.findMany();
    if (!allVehicles) allVehicles = [];

    if (userVehicles) {
      return { props: {userVehicles: userVehicles.vehicles, allVehicles: allVehicles} };
    } else {
      return { props: {userVehicles: [], allVehicles: allVehicles } };
    }
  }
});