
export default function Login({ className }) {
  return (
    <a className={className} href="/api/auth/login">Login</a> // auth0 docs say not to wrap it in Link component since this is an API route and not a normal page
  )
}