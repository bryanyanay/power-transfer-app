import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Layout from "../components/layout";

export default function Transfer() {
  return (
    <Layout title="Transfer Power">
      <p>This is where you can transfer power from one car to another.</p>
    </Layout>
  );
}

export const getServerSideProps : GetServerSideProps = withPageAuthRequired();