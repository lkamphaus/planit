import LoginLayout from '../components/LoginLayout';
import LoginNav from '../components/loginNav';
import LoginForm from '../components/loginForm';

const Login = () => {

  return (
    <LoginLayout>
      <LoginNav />
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;