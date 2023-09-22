import LoginForm from "../components/LoginForm";

function Login() {
  const types = ["log-in", "sign-up"]

  return (
    <section>
      {types.map((type, i) => (
        <LoginForm type={type} key={i}/>
      ))}
    </section>
  );
}
export default Login;
