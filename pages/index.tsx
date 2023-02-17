import type { FC, ReactElement } from "react";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "../pages/_app";

const Index: NextPageWithLayout = ({}) => {
  // const { data: session, status } = useSession();
  // if (status === "loading") {
  //   return null;
  // }
  return (
    <>
      {/* <h1>{session ? "Authenticated" : "Not Authenticated"}</h1>
       */}
      index
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
