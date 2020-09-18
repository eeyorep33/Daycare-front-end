const styles = (theme) => ({
  list: {
    width: '30rem',
    border: '2px solid #00FFFF',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      width: '20rem',
    },
  },
  links: {
    textDecoration: 'none',
    color: '#FF8C00',
    '&:hover': {
      color: '#00FFFF',
    },
    '&:focus': {
      color: '#00FFFF',
    },
  },

  menuHeader: {
    paddingLeft: '100px',
    color: '#FF8C00',
    fontSize: '2rem',
    height: 42,
    paddingTop: 5,
    [theme.breakpoints.down('sm')]: {
      height: 34,
    },
  },
  icons: {
    color: '#00FFFF',
  },
  text: {
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
});

export default styles;
