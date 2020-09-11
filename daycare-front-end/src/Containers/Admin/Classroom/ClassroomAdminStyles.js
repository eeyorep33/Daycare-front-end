const styles = (theme) => ({
  button: {
    ...theme.typography.buttons,
    marginRight: '20px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    marginBottom: '10px',
  },
  margin: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0,
    },
  },
  
  divMargin: {
    marginBottom: '30px',
    height: '2px',
    backgroundColor: '#00FFFF',
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
  mobile: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  root: {
    '& label.Mui-focused': {
      color: 'orange',
    },

    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'orange',
      },
    },
  },
});

export default styles;
