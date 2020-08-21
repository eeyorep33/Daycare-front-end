import React, { Component } from 'react';
import Modal from '../../../Components/Modals/EditModal';
import Button1 from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { getClassrooms, addClassroom, editClassroom, deleteClassroom } from '../../../Actions/ClassroomActions'
import { getMenu } from '../../../Actions/ApplicationActions'
import Grid from '@material-ui/core/Grid';
import styles from './ClassroomAdminStyles'
import SnackBar from '@material-ui/core/Snackbar'
import DeleteModal from '../../../Components/Modals/DeleteModal'


class ClassroomAdmin extends Component {
  state = {    
    open: false,
    index: null,   
    classroomName: "", 
     classroomHelper: "",
     error: null,
     errorOpen: false,
     backgroundColor: '',
     id: "",
     deleteOpen: false

    
  };

  componentDidMount() {
    this.getclassrooms();
    localStorage.setItem('route', '/admin/classrooms');
    if(this.props.classError !== null) {
    this.setState({error: this.props.classError, errorOpen: true, backgroundColor: "orange"})
      this.props.clearError()     
    }
   
  }

  openModal(i, name, type, id) {  
    if(type === "edit") {
      this.setState({
        classroomName: name,
      open: true,
     index: i,
     id: id
    });
    }   else {
      this.setState({
        classroomName: name,
      deleteOpen: true,
     id: i,
    }); 
    }     
      
  }

  closeModal(type) {   
    if(type === "edit") {
      this.setState({
        open: false, 
        classroomName: '', 
        index: '',
        id: ''
      });
    } else {
      this.setState({
        deleteOpen: false, 
        classroomName: '', 
        id: ''
      });
    }
   
  }

  getclassrooms() {
    this.props.getClassrooms(this.props.token, this.props.facilityId)   
  }



  addClassroom(event) {  
    event.preventDefault(); 
   
    let data = {
      classroomName: event.target.addClass.value,
      facilityId: localStorage.getItem("facilityId"),
    };
    this.props.addClassroom(this.props.token, data)       
    this.setState({classroomName: ''}); 

   
      
  }

  editClassroom(e, index) {
    e.preventDefault();    
    const name = { name: this.state.classroomName };    
    this.props.editClassroom( name, this.state.id) 
    
     this.setState({classroomName: ''});
    this.closeModal("edit")
    
  }

  updateclassroomName(e) {  
    console.log(e)  
    let valid; 
this.setState({
  classroomName: e
})
valid = e.length > 0
if(!valid) {
this.setState({
  classroomHelper: "Please enter a Classroom name."
})
} else {
  this.setState({
    classroomHelper: ""
  })
}


  }
  
  
  deleteClassroom() {
    this.props.deleteClassroom(this.state.id)  
    this.closeModal()   
    
  }

  naturalCompare = (a,b) => {
    var ax = [], bx = [];

    a.name.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.name.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
    
    while(ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if(nn) return nn;
    }

    return ax.length - bx.length;
  }
  render() {
   
    const { classes } = this.props;
    let classMap = null;
    if (this.props.classrooms) {      
      classMap = (
       
          <div>
          {this.props.classrooms.sort(this.naturalCompare).map((classroom, i) => {
            return (
             <React.Fragment>
               <Grid container spacing={3}  className={classes.buttonContainer}>
                 <Grid className={classes.mobile} item xs={12} sm={6} key={classroom.id}>              
                  <Typography
                  color="secondary"
                    variant="h4"
                    style={{ fontWeight: 700}}
                    className={classes.margin}
                  >
                    {classroom.name}
                  </Typography>                
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.mobile}>                
                  <Button1
                    variant="contained"
                    className={classes.button}
                    color="secondary"
                    onClick={() => this.openModal(i, classroom.name, "edit", classroom.id)}
                  >
                    Update
                  </Button1>
                  <Button1
                    variant="contained"
                    className={classes.button}
                    color="secondary"
                    onClick={() => this.openModal(classroom.id, classroom.name)}
                  >
                    Delete
                  </Button1>               
                </Grid>
                </Grid>
                <hr className={classes.divMargin}></hr>
            </React.Fragment>
            );
          })}

          <Modal
            open={this.state.open}           
            close={() => this.closeModal("edit")}
            change={(e) => this.updateclassroomName(e.target.value, e.target.name)}
            update={(e) => {this.editClassroom(e, this.state.index)}}
            name = {this.state.classroomName}
            component={this.props.classrooms}
            index={this.state.index}
            type={'Classroom'}    
            nameHelper={this.state.classroomHelper}
               
          />
          <DeleteModal 
            deleteOpen={this.state.deleteOpen}           
            close={() => this.closeModal()}
            name={this.state.classroomName}
            delete={(e) => this.deleteClassroom()}
            type={"Classroom"}
            />
          </div>
      
      );
    }

    return (    
        <div className={classes.container}>
            <SnackBar
      styles={{display: "flex", justifyContent: "center"}}
      open={this.props.classError !== null ? true : false} 
      anchorOrigin={{vertical: "top", horizontal: "center"}}
       message={this.props.classError}
        ContentProps={{style: {
        backgroundColor: "orange"
      }}
    }
    onClose={() => this.props.clearError()}
    autoHideDuration={4000}
      >

      </SnackBar>
        <form onSubmit={(e) => this.addClassroom(e)}>
          <TextField
            variant="outlined"
            id="classroomName"
            label={<Typography variant="h5">Classroom Name</Typography>}
            type="text"
            fullWidth
            name="addClass"
            className={classes.root}
            style={{ marginBottom: '10px' }}
            value={this.state.classroomName}
            error={this.state.classroomHelper.length > 0}
            helperText={this.state.classroomHelper}
            onChange={e => this.updateclassroomName(e.target.value)} 
         
          />
        
          <div className={classes.addButton}>
            <Button1
              variant="contained"
              className={classes.button}
              color="secondary"
              type="submit"
              disabled={this.state.classroomName.length === 0}
            >
              Add Classroom
            </Button1>
          </div>
        </form>
        <hr style={{ marginBottom: '30px' }} />
        {classMap}
        </div>     
    );
  }
}

const mapStateToProps = state => {
  return {
    classrooms: state.classroomReducer.classrooms,
      menuItems: state.appReducer.menuItems,
      sideDrawerOpen: state.appReducer.sideDrawerOpen,
      isAuth: state.appReducer.isAuth,
      token: state.appReducer.token,
      user: state.appReducer.user,
      facilityId: state.appReducer.facilityId,
      authLoading: state.appReducer.authLoading, 
      classError: state.classroomReducer.classError
  }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
    getClassrooms: (token, facilityId) => dispatch(getClassrooms(token, facilityId)),
    addClassroom: (token, classroom) => dispatch(addClassroom(token, classroom)),
    editClassroom: (token, classroom, id) => dispatch(editClassroom(token, classroom, id)),
    getSideMenuItems: () => dispatch(getMenu()),
    updateMenu: (index, name) => dispatch({type: "UPDATE_MENU", values: {index: index, name: name}}),
    clearError: () => dispatch({ type: 'CLEAR_CLASS_ERROR' }),
    deleteClassroom: (id) => dispatch(deleteClassroom(id))
  
    }
  
  }
  export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(ClassroomAdmin)
)
