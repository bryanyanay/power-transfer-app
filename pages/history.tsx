import Layout from "../components/layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function History() {
  return (
    <Layout title="Your History">
      <p>This is your transfer history.</p>
    </Layout>
  );
}

export const getServerSideProps : GetServerSideProps = withPageAuthRequired();