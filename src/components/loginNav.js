import Link from 'next/link';

const LoginNav = () => {

  return (
    <>
      <Link href="/login" passHref>
        <h3>Log in</h3>
      </Link>
      <Link href="/signup" passHref>
        <h3>Sign up</h3>
      </Link>
    </>
  );
};

export default LoginNav;
