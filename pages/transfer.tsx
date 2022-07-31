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

/* withPageAuthRequired() should wrap ur existing getServerSideProps if u have one, i think like below
export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    console.log("query", ctx.query);
    // This was in the documentation but doesn't seem to be needed:
    // https://auth0.github.io/nextjs-auth0/modules/helpers_with_page_auth_required.html#withpageauthrequiredoptions
    //
    // const session = getSession(ctx.req, ctx.res);
    return { props: { customProp: "bar" } };
  },
});
*/