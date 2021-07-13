import LoginLayout from '../components/loginLayout';
import LoginNav from '../components/loginNav';
import LoginForm from '../components/loginForm';


const Login = () => {

  return (
    <LoginLayout>
      <LoginNav currentPage='/login' />
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;