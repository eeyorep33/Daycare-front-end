import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/'
import Button from '@material-ui/core/Button'
import useStyles from './DeleteModalStyles'
import Typography from '@material-ui/core/Typography';


const DeleteModal = props => {
    const classes = useStyles();  
return (
    <Dialog 
    open ={props.deleteOpen}
 
    >
        <div  className={classes.border}>
<DialogTitle className={classes.title}>Delete {props.type}</DialogTitle>
        <div className={classes.modal}>     
<Typography className={classes.content}>Are you sure you want to delete {props.name}?</Typography>
        </div>
        <div className={classes.buttonContainer}>
            <Button type="submit" onClick={props.delete} className={classes.button} variant="contained" color="secondary">Save Changes</Button>
<Button variant="contained"  className={classes.button} onClick={props.close}color="secondary">Cancel</Button>
</div>
</div>
    </Dialog>
)
}

export default DeleteModal;