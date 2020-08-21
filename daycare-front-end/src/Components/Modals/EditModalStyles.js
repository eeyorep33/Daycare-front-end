import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles(theme => ({
    button: {
      ...theme.typography.buttons,
     marginLeft: "20px",
     marginRight: "10px"
      
     
    },
  
    buttonContainer: {
  marginTop: "30px",
  display: "flex",
  justifyContent: "center",
  marginBottom: "3rem",
 
    },
    input: {
     
      display: "flex",
      marginTop: "2rem",
      justifyContent: "center",
      alignItems: "center",
      '& label.Mui-focused': {
        color: 'orange',
      },
      
      '& .MuiOutlinedInput-root': {         
    width: "70%",
        '&.Mui-focused fieldset': {
          borderColor: 'orange',
        },
      }
    },
 
    displayImage: {
      width: "auto",
      height: "auto",
      maxWidth: "12rem",
      border: "2px solid #00FFFF",
      borderRadius: "3px",
      marginLeft: "3rem",
      padding: "0",
      [theme.breakpoints.down('xs')]: {
        marginLeft: '0'
       
      },
    },
    noImage:{
      border: "2px solid #00FFFF",
      width: "auto",
      height: "12rem",
      marginLeft: "4rem",
      display: "flex",     
      alignItems: "center",
      [theme.breakpoints.down('xs')]: {
        marginLeft: '0'
       
      },
     
    },
    imageContainer: {
      display: "flex",
      padding: "0",
      margin: "0",
      marginTop: "2rem",          
      marginLeft: "3rem",
      [theme.breakpoints.down('xs')]: {
        marginLeft: '0',
        justifyContent: "center"
      },
    },
    imagePicker: {
      display: 'flex',
      justifyContent: 'center',
      width: '70rem',
    },
    titleMargin: {
      marginLeft: '8rem',
      fontSize: '2rem',
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0',
        fontSize: '1.5rem',
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
    currentInfo: {
      marginTop: "2rem",
      [theme.breakpoints.down('xs')]: {
      display: "flex",
      justifyContent: "center"
      },
    },
    radioContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    title: {
      display: "flex",
      justifyContent: "center",     
      color: "#FF8C00"
    },
    formContainer: {
      width: "70rem",
      height: "auto",
      border: "1px solid #00FFFF",  
      marginRight: "auto",
      marginLeft: "auto",
      display: "block",
      marginTop: "50px",
      [theme.breakpoints.down("xs")]: {
      width: "30rem"
        
       }
    
    },
    
   
      
    }))

    export default useStyles;
  