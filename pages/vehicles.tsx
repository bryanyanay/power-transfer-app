import Layout from "../components/layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { useState } from 'react';
import Table from "../components/table";
import { useRouter } from "next/router";

import { prisma } from '../utils/db';

import styles from '../styles/add-vehicle.module.css';
import btnStyles from '../styles/button.module.css';


export default function Vehicles({ vehicles, test, e }) {
  const [license, setLicense] = useState("");
  const { user } = useUser();
  const router = useRouter();

  // make the server refetch and serve the props data (vehicles) for this page
  // see: https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  const refreshData = () => { 
    router.replace(router.asPath);
  }

  const addVehicle = async () => { // can't post to database on client-side, must use API routes 
    await fetch('/api/addVehicle', {
      method: 'POST',
      body: JSON.stringify({
        license: license,
        user: user //technically we only need to send user.name and user.email, but im sending it all lmao
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setLicense("");
    refreshData();
  }

  if (vehicles.length) {
    vehicles = vehicles.map((v) => {
      return <tr key={v.id}><td>{v.id}</td><td>{v.license}</td></tr>;
    })
  } else {
    vehicles = <tr key={0}><td>No Vehicles</td><td></td></tr>
  }

  return (
    <Layout title="Your Vehicles">
      <Table wide={false} cols={["Vehicle ID", "License Plate"]}>
        {vehicles}
      </Table>
      <form className={styles.form}>
        <button className={btnStyles.button} onClick={addVehicle} type="button">Add Vehicle</button>
        <label htmlFor="license">Enter License: </label>
        <input 
          type="text" 
          maxLength={6}
          onChange={(e) => { setLicense(e.target.value); }} 
          name="license" 
          value={license} 
          id="license" />
      </form>
      <div>
        {JSON.stringify(test)}
        {(e == null) ? "it is null" : JSON.stringify(e)}
      </div>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { user } = getSession(req, res);
/*     const vehicles = await prisma.user.findUnique({
      where: { email: user.email },
      select: { vehicles: true }
    }); */

    const qStr = {
      "query": `query ($email: String) {
        Vehicle (where: {ownerEmail: {_eq: $email}}) {
          id
          license
        }
      }`,
      "variables": { "email": user.email }
    };
    const q = {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "x-hasura-admin-secret": process.env.X_HASURA_ADMIN_SECRET
      },
      "body": JSON.stringify(qStr)
    };
    const test = await fetch("https://power-transfer-api.hasura.app/v1/graphql", q);
    const data = await test.json();

    return { props: { vehicles: [], test: data, e: user} };

/*     if (!vehicles) { // vehicles is null if we don't find any i believe
      return {props: { vehicles: [] } };
    } else {
      return { props: { vehicles: vehicles.vehicles } };
    } */
  }
});