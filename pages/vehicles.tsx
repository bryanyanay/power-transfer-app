import Layout from "../components/layout";
import { useUser, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";

import { useState } from 'react';
import Table from "../components/table";
import AddVehicle from "../components/addVehicle";
import { useRouter } from "next/router";

import { prisma } from '../utils/db';


export default function Vehicles({ vehicles }) {
  const [license, setLicense] = useState("");
  const { user } = useUser();
  const router = useRouter();

  // make the server refetch and serve the props data (vehicles) for this page
  // see: https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  const refreshData = () => { 
    router.replace(router.asPath);
  }

  const addVehicle = async () => { //nvm can't do this on client-side, must use API routes
    await prisma.vehicle.create({
      data: {
        license: license,
        owner: {
          connectOrCreate: {
            where: {
              email: user.email
            }, 
            create: {
              email: user.email,
              name: user.name
            }
          }
        }
      }
    });
    setLicense("");
    refreshData();
  }


  if (vehicles.length) {
    vehicles = vehicles.map((v) => {
      return <tr><td>{v.id}</td><td>{v.license}</td></tr>;
    })
  } else {
    vehicles = <tr><td>No Vehicles</td><td></td></tr>
  }

  return (
    <Layout title="Your Vehicles">
      <Table cols={["Vehicle ID", "License Plate"]}>
        {vehicles}
      </Table>
      <form>
        <button onClick={addVehicle} type="button">Add Vehicle</button>
        <label htmlFor="license">Enter License: </label>
        <input 
          type="text" 
          onChange={(e) => { setLicense(e.target.value); }} 
          name="license" 
          value={license} 
          id="license" />
      </form>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { user } = getSession(req, res);
    const vehicles = await prisma.user.findUnique({
      where: { email: user.email },
      select: { vehicles: true }
    });
    if (!vehicles) { // vehicles is null if we don't find any i believe
      return {props: { vehicles: [] } };
    } else {
      return { props: { vehicles: vehicles.vehicles } };
    }
  }
});