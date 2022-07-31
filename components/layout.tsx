import Head from 'next/head';
import Navbar from './navbar';

export default function Layout({ children, title }: { children: React.ReactNode, title: string}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar/>
      <main>{children}</main>
    </>
  )
}