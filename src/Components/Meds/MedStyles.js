import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2rem',
    },
  },
  title: {
    fontSize: '3rem',
    marginBottom: '4rem',
  },
  
  subTitle: {
    fontSize: '2rem',
    marginTop: '0.5rem',
  },
  componentBorder: {
    border: '1px solid aqua',
    minHeight: '10rem',
    display: 'flex',
    alignItems: 'center',
  },
  divMargin: {
    height: '2px',
    backgroundColor: '#00FFFF',
  },
  addContainer: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '10rem',
    justifyContent: 'center',
  },
  lineSpacing: {
    marginBottom: '10px',
    marginTop: '10px',
  },
  divider: {
    height: '2px',
    backgroundColor: '#00FFFF',
    marginTop: '5rem',
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
  mobileButtons: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
    },
  },
  button: {
    ...theme.typography.buttons,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
    },
  },
}));

export default useStyles;
