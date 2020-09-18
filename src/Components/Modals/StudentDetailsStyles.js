import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    ...theme.typography.buttons,
    marginLeft: '20px',
    marginRight: '10px',
  },
 
  buttonContainer: {
    marginTop: '4rem',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '4rem',
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
    margin: '0',
    marginTop: '2rem',
    marginLeft: '3rem',
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0',
      justifyContent: 'center',
    },
  },
  imagePicker: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '4rem',
    width: '70rem',
  },
 
  currentInfo: {
    marginTop: '2rem',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  checkedIn: {
    marginTop: '-3rem',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
    },
  },
  radioContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    color: '#FF8C00',
  },
 
}));

export default useStyles;
