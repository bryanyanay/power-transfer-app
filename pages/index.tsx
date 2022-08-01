import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Layout from '../components/layout';

import styles from '../styles/home.module.css';

function LinkCard({href, title, description}: {href: string, title: string, description: string}) {
  return (
    <Link href={href}>
      <a className={styles.card}>
        <h2>{title} &rarr;</h2>
        <p>{description}</p>
      </a>
    </Link>
  );
}

export default function Home() {
  const { user } = useUser();

  return (
    <Layout title="Power Transfer">
      <div className={styles.layout}>
        { user ? // should we add smth for if useUser is still loading the user or an error occurs??
          <h1 className={styles.title}>Welcome, {user.name}</h1>
          :
          <h1 className={styles.title}>Welcome! Login to get started.</h1>
        }
        
        <div className={styles["card-grid"]}>  
          <LinkCard href='/transfer' title='Transfer' description='Initiate a power transfer between vehicles.'/>
          <LinkCard href='/history' title='History' description='View your past power transfers.'/>
          <LinkCard href='/vehicles' title='Vehicles' description='View the vehicles you own.'/>
        </div>
      </div>
    </Layout>
  );
}