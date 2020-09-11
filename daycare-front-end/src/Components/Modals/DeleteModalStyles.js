import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    height: '15rem',
    marginLeft: '3rem',
    marginRight: '3rem',
  },
  button: {
    ...theme.typography.buttons,
    marginLeft: '20px',
    marginRight: '10px',
  },
  content: {
    fontSize: '2.5rem',
    textAlign: 'center',
  },
  border: {
    border: '1px solid #00FFFF',
    margin: '1rem',
    borderRadius: '3px',
  },

  buttonContainer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10px',
  },

  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FF8C00',
    marginBottom: '8rem',
  },
}));

export default useStyles;
