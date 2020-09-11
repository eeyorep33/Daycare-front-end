const styles = (theme) => ({
  radioContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  imagePicker: {
    display: 'flex',
    justifyContent: 'center',
    width: '70rem',
  },
  displayImage: {
    width: 'auto',
    height: 'auto',
    maxWidth: '12rem',
    border: '2px solid #00FFFF',
    borderRadius: '3px',
    marginLeft: '3rem',
    padding: '0',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
    },
  },
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
  button: {
    ...theme.typography.buttons,
    marginLeft: '20px',
    marginRight: '10px',
  },
  buttonContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  noImage: {
    border: '2px solid #00FFFF',
    width: 'auto',
    height: '12rem',
    marginLeft: '4rem',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
    },
  },
 
  imageContainer: {
    display: 'flex',
    padding: '0',

    marginTop: '2rem',
    marginLeft: '5rem',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      justifyContent: 'center',
    },
  },
  editButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  title: {
    textAlign: 'center',
    color: 'orange',
    fontSize: '5rem',
    [theme.breakpoints.down('sm')]: {
      minWidth: 50,
      fontSize: '3rem',
    },
  },
  currentInfo: {
    marginTop: '2rem',
    fontSize: '2rem',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  profileInfo: {
    color: 'orange',
    fontSize: '2rem',
  },
  editButton: {
    color: '#DE7702',
    fontSize: '2rem',
    textTransform: 'none',
    '&:hover': {
      color: 'orange',
      backgroundColor: 'transparent',
    },
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    marginTop: '10rem',
    backgroundColor: 'white',
    [theme.breakpoints.up('sm')]: {
      marginTop: '10rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '5rem',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
