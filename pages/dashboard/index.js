import { Heading } from "components/Heading";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const DashboardPage = () => {

  const { data: session, status } = useSession();

  const router = useRouter();

  const loading = status === 'loading';

  if(loading) return null;

  if(!session) {
    router.push('/');
  };

  if(session && !session.user.name) {
    router.push('/setup');
  };

  return (
    <div>
      <Head>
        <title>Digital Downloads || Dashboard</title>
        <meta name="description" content="Digital Downloads Website" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
  
      <Heading />
      <h1 className="flex justify-center mt-20 text-xl">Dashboard</h1>

      <div className="flex justify-center mt-10">
        <Link href={'/dashboard/new'}>
          <a className="text-xl border p-2">Create new product</a>
        </Link>
      </div>
    </div>
  )
};

export default DashboardPage;