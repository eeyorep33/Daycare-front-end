import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    ...theme.typography.buttons,
    marginRight: '20px',
    maxHeight: '4rem',
    [theme.breakpoints.down('sm')]: {
      width: '3rem',
      height: '3rem',
      fontSize: '1rem',
    },
  },
  button2: {
    ...theme.typography.buttons,
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      width: '10rem',
      height: '3rem',
      fontSize: '1rem',
    },
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
  addButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
    marginBottom: '10px',
  },
  content: {
    border: '1px solid #cc7a00',
    marginTop: '7px',
    padding: '5px',
    borderRadius: '3px',
  },
  margin: {
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 0,
    },
  },
  align: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      marginLeft: '1rem',
    },
  },

  container: {
    border: '1px solid #00FFFF',
    padding: '3rem',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    backgroundColor: 'white',
    height: 'auto',
  },
  contentContainer: {
    border: '1px solid #00FFFF',
    padding: '5px',
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    backgroundColor: 'white',
    marginTop: '2rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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
}));

export default useStyles;
