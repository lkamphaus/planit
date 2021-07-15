import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
// import '@fullcalendar/interaction/main.css'
// import '@fullcalendar/react/main.css'
import '../styles/globals.css'
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';
import Account from '../accountContext';

export default function MyApp(props) {
  const { Component, pageProps} = props;
  const { name } = useContext(Account);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Layout>
          <Component {...pageProps}/>
        </Layout>
      </ThemeProvider>

    </React.Fragment>
  );
}

