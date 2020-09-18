import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2rem',
    },
  },
  student: {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    marginLeft: '2rem',
  },
  title: {
    fontSize: '3rem',
    marginLeft: '22rem',
  },
  button: {
    ...theme.typography.buttons,
    marginLeft: '2rem',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  divMargin: {
    height: '2px',
    backgroundColor: '#00FFFF',
  },
  reportButton: {
    color: 'orange',
    fontSize: '2rem',
    textTransform: 'none',
    marginBottom: '3rem',
    marginLeft: '2rem',
    '&:hover': {
      color: '#DE7702',

      backgroundColor: 'transparent',
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
