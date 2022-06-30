import { Heading } from "components/Heading";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Digital Shop</title>
        <meta name="description" content="A great shop for digital assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />

      <h1 className="flex justify-center mt-20 text-xl">Welcome!</h1>
    </div>
  )
};