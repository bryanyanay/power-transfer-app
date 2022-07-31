import Layout from "../components/layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Vehicles() {
  return (
    <Layout title="Your Vehicles">
      <p>These are your vehicles</p>
    </Layout>
  );
}

export const getServerSideProps : GetServerSideProps = withPageAuthRequired();