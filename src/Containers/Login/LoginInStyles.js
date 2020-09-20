import hands from '../../images/hands.jpg';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  hands: {
    backgroundImage: `url(${hands})`,
    backgroundPosition: 'bottom-center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', 
    width: '80rem',
    height: '80rem',
    position: 'fixed',
    zIndex: '-200',
    opacity: '0.2',
    marginTop: '0',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '40rem',
      height: '40rem',
      marginTop: '5rem',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '60rem',
      height: '60rem',
      marginTop: '10rem',
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

  handsContainer: {
    display: 'flex',
    justifyContent: 'center',
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
  signUpLink: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  login: {
    ...theme.typography.buttons,

    width: '70px',
    height: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    marginTop: '30px',
    fontSize: "1rem"
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