const styles = (theme) => ({
  title: {
    textAlign: 'center',
    color: '#cc7a00',
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
      minWidth: 50,
      fontSize: '2rem',
    },
  },
  hands: {
    width: '50%',
    height: 'auto',
    display: 'block',
    position: 'fixed',
    zIndex: '-200',
    opacity: '0.2',
    top: '20%',
    left: '28%',
  },
  content: {
    border: '1px solid #cc7a00',
    marginTop: '7px',
    padding: '5px',
    borderRadius: '3px',
  },
  date: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  container: {
    border: '1px solid #00FFFF',
    padding: '5px',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    backgroundColor: 'white',
  },
});

export default styles;
