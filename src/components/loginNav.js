import Link from 'next/link';
import styles from '../styles/Login.module.css';

const LoginNav = ({ currentPage }) => {

  const links = [
    {
      href: '/login',
      label: 'Log in',
    },
    {
      href: '/signup',
      label: 'Sign up',
    }];

  const linksHTML = links.map((link, index) => {
    if (currentPage === link.href) {
      return <h3 key={`link_${index}`}>{link.label}</h3>;
    } else {
      return (
        <Link key={`link_${index}`} href={link.href}>
          <a><h3 >{link.label}</h3></a>
        </Link>
      );
    }
  });

  return (
    <div className={styles.navContainer}>
      {linksHTML}
    </div>
  );
};

export default LoginNav;
