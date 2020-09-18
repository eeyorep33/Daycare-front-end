import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
      ...theme.mixins.toolbar,
      marginBottom: '3em',
    },
   
    menuButton: {
      marginRight: theme.spacing(2),
      marginLeft: '1em',
    },
    title: {
      flexGrow: 1,
    },
    button: {
      fontSize: '2rem',
      fontWeight: 800,
      [theme.breakpoints.down('sm')]: {
        minWidth: 50,
        fontSize: '1.5rem',
      },
    },
    avatar: {
      marginLeft: '.5em',
      marginRight: '.5em',
      width: '5rem',
      height: '5rem',
    },
  }));

  export default useStyles;