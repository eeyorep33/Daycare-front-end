import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  studentList: {
    marginLeft: '2rem',
    fontSize: '2rem',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '4rem',
  },
  button: {
    ...theme.typography.buttons,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
    },
  },
  mobileContainer: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  mobile: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
    },
  },
}));

export default useStyles;
