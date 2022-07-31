import Link from 'next/link';

export default function LogIn() {
  return (
    <div>You're not logged in yet.
      <Link href='/dashboard'>
        <a>Go to ur dashboard.</a>
      </Link>
    </div>
  );
}