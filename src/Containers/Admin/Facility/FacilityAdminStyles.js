const styles = (theme) => ({
  textContainer: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.between('sm', 'md')]: {
      width: '70%',
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '90%',
    },
  },
  button: {
    ...theme.typography.buttons,
    marginLeft: '20px',
    marginRight: '10px',
  },

  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #00FFFF',
    borderRadius: '5px',
    padding: '2rem',
    marginTop: '10rem',
    backgroundColor: 'white',
    [theme.breakpoints.up('sm')]: {
      marginTop: '15rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '5rem',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#cc7a00',
    fontSize: '3rem',
    [theme.breakpoints.down('sm')]: {
      minWidth: 50,
      fontSize: '2rem',
      marginBottom: '2rem',
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
