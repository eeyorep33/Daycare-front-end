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
  center: {
    marginLeft: '2rem',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: '0',
    },
  },
  
  button: {
    ...theme.typography.buttons,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
    },
  },
  headers: {
    color: 'orange',
    fontSize: '2rem',
  },
}));

export default useStyles;
