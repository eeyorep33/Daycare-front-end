import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    ...theme.typography.buttons,
    marginLeft: '20px',
    marginRight: '10px',
    height: '4rem',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },

  buttonContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '3rem',
  },
  

  title: {
    display: 'flex',
    justifyContent: 'center',
    color: '#FF8C00',
    fontSize: '3rem',
  },
  formContainer: {
    width: '50rem',
    height: '40rem',
    border: '1px solid #00FFFF',
    margin: '2rem',
  },
}));

export default useStyles;
