import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import '../styles/globals.css';


function MyApp({ Component, pageProps }) {
  // arrumando problema de rendenizaçao do css do server side no refresh da pagina
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Component {...pageProps} />
    </SnackbarProvider>
  );
}
export default MyApp;
