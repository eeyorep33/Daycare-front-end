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
    radioContainer: {
      display: 'flex',
      justifyContent: 'center',
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
  
    employeeImage: {
      width: "8rem",
      height: "auto"
    },
    titleMargin: {
      marginLeft: '8rem',
      fontSize: '2rem',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0',
        fontSize: '1.5rem',
      },
    },
    formContainer: {
      // justifyContent: 'center',
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
      // alignItems: 'center',
      marginBottom: "10rem"
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
    radioGroup: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginLeft: '3rem',
      [theme.breakpoints.down('xs')]: {
        marginLeft: '0',
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
  