import { useUser } from '@auth0/nextjs-auth0';

import style from '../styles/navbar.module.css';

import Login from './login';
import Logout from './logout';
import Link from 'next/link';

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className={style.nav}>
      <Link href='/'>
        <a className={style["title-link"]}>Power Transfer App</a> 
      </Link>
      <Link href='/transfer'>
        <a className={style.link}>Transfer</a>
      </Link>
      <Link href='/history'>
        <a className={style.link}>History</a>
      </Link>
      <Link href='/vehicles'>
        <a className={style.link}>Vehicles</a>
      </Link>
      <button>
        {user ? (
          <Logout />
        ) : (
          <Login />
        )}
      </button>
    </nav>
  );
}