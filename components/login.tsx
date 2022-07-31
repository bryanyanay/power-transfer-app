
export default function Login() {
  return (
    <a href="/api/auth/login">Login</a> // auth0 docs say not to wrap it in Link component since this is an API route and not a normal page
  )
}