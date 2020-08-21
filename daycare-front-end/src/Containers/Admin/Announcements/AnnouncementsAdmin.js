import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';
import styles from './AnnounceStyles'
import SnackBar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'; 
import  { getAnnouncements, editAnnouncements, deleteAnnouncements, addAnnouncement} from '../../../Actions/ApplicationActions'
import Grid from '@material-ui/core/Grid'
import Modal from '../../../Components/Modals/EditModal'
import DeleteModal from '../../../Components/Modals/DeleteModal';


class AnnounceAdmin extends Component {
  state = {    
    open: false,
    index: null,   
    announceContent: "", 
     announceHelper: "",
     id:'',
     deleteOpen: false
    
  };

  componentDidMount() {
    this.getAnnouncements();
  
    localStorage.setItem('route', '/admin/announcements');
   
  }

  openModal(i, name, type, id) {  
    if(type === "edit") {
      this.setState({
        announceContent: name,
      open: true,
     index: i,
     id: id
    });
    }   else {
      this.setState({
        announceContent: name,
      deleteOpen: true,
     id: i,
    }); 
    }     
      
  }

  closeModal(type) {   
    if(type === "edit") {
      this.setState({
        open: false, 
        announceContent: '', 
        index: '',
        id: ''
      });
    } else {
      this.setState({
        deleteOpen: false, 
        announceContent: '', 
        id: ''
      });
    }
   
  }


  getAnnouncements() {
    this.props.getAnnouncements(this.props.token, this.props.facilityId)   
  }



  addAnnouncement(event) {  
    event.preventDefault();    
    let data = {
      content: this.state.announceContent,
      facilityId: localStorage.getItem("facilityId"),
    };
    this.props.addAnnouncements(this.props.token, data)       
    this.setState({announceContent: ''}); 

   
      
  }

  editAnnouncement(e, index) {
    e.preventDefault();    
    const content = { content: this.state.announceContent };    
    this.props.editAnnouncements(content, this.state.id) 
    
     this.setState({announceContent: ''});
    this.closeModal("edit")
    
  }

  updateContent(e) {    
    let valid; 
this.setState({
  announceContent: e
})
valid = e.length > 0
if(!valid) {
this.setState({
  announceHelper: "Please enter a Announcement content."
})
} else {
  this.setState({
    announceHelper: ""
  })
}


  }
  
  
  deleteAnnouncement() {
    this.props.delteAnnouncements(this.state.id)
    this.closeModal("delete")
  }

  render() {
    const { classes } = this.props;
    let announceMap = null;
    if (this.props.announcements) {      
      announceMap = (
       
           <Grid item container spacing={3}  className={classes.contentContainer}>          
                          
          {this.props.announcements.map((announcement, i) => {
          let date = new Date (announcement.createdAt)            
          const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
          const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
          let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
          if(da.substring(0,1) === "0") {
          da = da.substring(1,2)
          }
          let append = "";
          switch(da) {
              case "1": append= "st";
              break;
              case "2": append = "nd";
              break;
              case "3": append = "rd";
              break;
              default: append = "th"
          }
          da = da + append;
          date = `${mo} ${da}, ${ye}`
          
       return (
        <Grid item container className = {classes.content}key={announcement.id}>          
           <Grid item  xs={12}><Typography
                  color="secondary"
                    variant="h4"
                    style={{ fontWeight: 700}}
                    className={classes.margin}
                  > {date}</Typography>
                    </Grid>
             
              <Grid item sm={6} xs={12} wrap>
               <Typography>{announcement.content}</Typography>
               </Grid>
               <Grid item container sm={6} xs={12}>
               <Grid item className={classes.align}xs={12}>
               <Button
                    variant="contained"
                    className={classes.button}
                    color="secondary"
                    onClick={() => this.openModal(i, announcement.content, "edit", announcement.id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    className={classes.button}
                    color="secondary"
                    onClick={() => this.openModal(announcement.id, announcement.content, "delete")}
                  >
                    Delete
                  </Button> 
                  </Grid>
                  </Grid>
           </Grid>
       )
          })}
     
       </Grid> 
          
      
      );
    }
    return (
      <Grid container className={classes.container}>
        <Typography className={classes.title}>Add an Announcement</Typography>
    
  <form onSubmit={(e) => this.addAnnouncement(e)}>
    <TextField
      variant="outlined"
      id="announeContent"
      label={<Typography variant="h5">Announcement Content</Typography>}
      type="text"
      fullWidth
      name="addAnnounce"
      className={classes.root}
      style={{ marginBottom: '10px' }}
      value={this.state.announceContent}
      error={this.state.announceHelper.length > 0}
      helperText={this.state.announceHelper}
      onChange={e => this.updateContent(e.target.value)} 
   
    />
  
    <div className={classes.addButton}>
      <Button
        variant="contained"
        className={classes.button2}
        color="secondary"
        type="submit"
        disabled={this.state.announceContent.length === 0}
      >
        Add Announcement
      </Button>
    </div>
  </form>
  <hr style={{ marginBottom: '30px' }} />
 <Typography className={classes.title}>Announcements</Typography> 
 <Modal
            open={this.state.open}           
            close={() => this.closeModal("edit")}
            change={(e) => this.updateContent(e.target.value)}
            update={(e) => {this.editAnnouncement(e, this.state.index)}}
            name = {this.state.announceContent}
            component={this.props.announcements}
            index={this.state.index}
            type={'Announcement'}    
            nameHelper={this.state.announceHelper}
               
          />
          <DeleteModal 
            deleteOpen={this.state.deleteOpen}           
            close={() => this.closeModal()}
            name = {"this announcement"}
          type={"Announcement"}
            delete={(e) => this.deleteAnnouncement()}
            />
  {announceMap}
  </Grid>    
    )
  }
} 

const mapStateToProps = state => {
  return {  
      menuItems: state.appReducer.menuItems,
      sideDrawerOpen: state.appReducer.sideDrawerOpen,
      isAuth: state.appReducer.isAuth,
      token: state.appReducer.token,
      user: state.appReducer.user,
      facilityId: state.appReducer.facilityId,
      authLoading: state.appReducer.authLoading, 
      announcements: state.appReducer.announcements,
      
  }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
   getAnnouncements: () => dispatch(getAnnouncements()),
   editAnnouncements: (content, id) => dispatch(editAnnouncements(content, id)),
   delteAnnouncements: (id) => dispatch(deleteAnnouncements(id)),
   addAnnouncements: (token, data) => dispatch(addAnnouncement(token, data)),
  

  
    }
  
  }
  export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(AnnounceAdmin)
)

