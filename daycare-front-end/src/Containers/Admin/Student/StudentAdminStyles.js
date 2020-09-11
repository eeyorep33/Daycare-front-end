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
 
  imagePicker: {
    display: 'flex',
    justifyContent: 'center',
    width: '70rem',
  },
  title: {
    textAlign: 'center',
    color: 'orange',
    fontSize: '3rem',
    [theme.breakpoints.down('xs')]: {
      minWidth: 50,
      fontSize: '2rem',
      marginBottom: '2rem',
    },
  },
  dropdown: {
    width: '47rem',
  },

  formContainer: {
    
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
    marginBottom: '10rem',
  },
  button2: {
    ...theme.typography.buttons,
    marginRight: '20px',
    [theme.breakpoints.down('xs')]: {
      width: '10rem',
      height: '3rem',
      fontSize: '1rem',
      marginRight: '10px',
    },
  },
 
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

  divMargin: {
    marginBottom: '30px',
    height: '2px',
    backgroundColor: '#00FFFF',
  },
  mobile: {
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  margin: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0,
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
