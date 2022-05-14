import { makeStyles } from '@material-ui/core';
// função do material UI para mudar css, semelhante a criação de um objeto em javascript

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#203040',
    //muda o style do child, no caso o texto com o nome da loja
    '& a': {
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  brand: {
    //logo do site
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },

  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },
});
export default useStyles;
