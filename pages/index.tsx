import Link from 'next/link';
import Login from '../components/login';
import Logout from '../components/logout';
import Profile from '../components/profile';

export default function LogIn() {
  return (
    <div>
      <Link href='/dashboard'>
        <a>Go to ur dashboard.</a>
      </Link> <br/>
      <Login /> <br/>
      <Logout /> <br/>
      <Profile/>
    </div>
  );
}