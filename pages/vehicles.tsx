import Layout from "../components/layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Table from "../components/table";

export default function Vehicles() {
  return (
    <Layout title="Your Vehicles">
      <Table cols={["Vehicle ID", "License Plate"]}>
        <tr>
          <td>hello</td>
          <td>XXXXXX</td>
        </tr>
        <tr>
          <td>hello BRURUURHU</td>
          <td>XXXXXX</td>
        </tr>
      </Table>
    </Layout>
  );
}

export const getServerSideProps : GetServerSideProps = withPageAuthRequired();