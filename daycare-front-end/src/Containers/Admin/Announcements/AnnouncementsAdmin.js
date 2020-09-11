import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './AnnounceStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
  getAnnouncements, 
  editAnnouncements,
  deleteAnnouncements,
  addAnnouncement,
} from '../../../Actions/ApplicationActions';
import Grid from '@material-ui/core/Grid';
import Modal from '../../../Components/Modals/EditModal';
import DeleteModal from '../../../Components/Modals/DeleteModal';


const AnnounceAdmin = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.appReducer.token);
  const facilityId = useSelector(state => state.appReducer.facilityId)
  const announcements = useSelector(state => state.appReducer.announcements)
  const user = useSelector(state => state.appReducer.user)
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(null)
  const [announceContent, setAnnounceContent] = useState('')
  const [announceHelper, setAnnounceHelper] = useState('')
  const [id, setId] = useState('')
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    (async () => {
      dispatch(getAnnouncements(facilityId, token));
    })();
  }, []);

  const openModal=(i, name, type, id)=> {
    if (type === 'edit') {
      setAnnounceContent(name)
      setOpen(true)
      setIndex(i)
      setId(id)
    } else {
      setAnnounceContent(name)
      setDeleteOpen(true)
      setId(i)
    }
      }


      const  closeModal = (type) => {
            if (type === 'edit') {
              setOpen(false)
              setAnnounceContent('')
              setId('')
              setIndex('')     
             } else {
               setDeleteOpen(false)
               setAnnounceContent('')
               setId('')       
             }
            }
          
   const addAnnouncements = (event) =>{
    event.preventDefault();
    let data = {
      content: announceContent,
      facilityId: facilityId,
    };
    dispatch(addAnnouncement(token, data, user.id));
    setAnnounceContent('')
  }


    const editAnnouncement = (e, index) => {
    e.preventDefault();
    const content = { content: announceContent };
    dispatch(editAnnouncements(token, content, id));

    setAnnounceContent('')
   setOpen(false)
  }

    const updateContent=(e) => {
    let valid;
   setAnnounceContent(e)
    valid = e.length > 0;
    if (!valid) {     
      setAnnounceHelper('Please enter a Announcement content.')
    } else {
     setAnnounceHelper('')
    }
  }

  const deleteAnnouncement = () =>{
    dispatch(deleteAnnouncements(
      token,
      id,
      facilityId,
      user.id
    ));
    closeModal('delete');
  }

  let announceMap = null;
      if (announcements) {
        announceMap = (
          <Grid item container spacing={3} className={classes.contentContainer}>
            {announcements.map((announcement, i) => {
              let date = new Date(announcement.createdAt);
              const ye = new Intl.DateTimeFormat('en', {
                year: 'numeric',
              }).format(date);
              const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(
                date
              );
              let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(
                date
              );
              if (da.substring(0, 1) === '0') {
                da = da.substring(1, 2);
              }
              let append = '';
              switch (da) {
                case '1':
                  append = 'st';
                  break;
                case '2':
                  append = 'nd';
                  break;
                case '3':
                  append = 'rd';
                  break;
                default:
                  append = 'th';
              }
              da = da + append;
              date = `${mo} ${da}, ${ye}`;
  
              return (
                <Grid
                  item
                  container
                  className={classes.content}
                  key={announcement.id}
                >
                  <Grid item xs={12}>
                    <Typography
                      color="secondary"
                      variant="h4"
                      style={{ fontWeight: 700 }}
                      className={classes.margin}
                    >
                      {' '}
                      {date}
                    </Typography>
                  </Grid>
  
                  <Grid item sm={6} xs={12} wrap>
                    <Typography>{announcement.content}</Typography>
                  </Grid>
                  <Grid item container sm={6} xs={12}>
                    <Grid item className={classes.align} xs={12}>
                      <Button
                        variant="contained"
                        className={classes.button}
                        color="secondary"
                        onClick={() =>
                          openModal(
                            i,
                            announcement.content,
                            'edit',
                            announcement.id
                          )
                        }
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        className={classes.button}
                        color="secondary"
                        onClick={() =>
                        openModal(
                            announcement.id,
                            announcement.content,
                            'delete'
                          )
                        }
                      >
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        );
          }

  return (
          <Grid container className={classes.container}>
        <Typography className={classes.title}>Add an Announcement</Typography>

        <form onSubmit={(e) => addAnnouncements(e)}>
          <TextField
            variant="outlined"
            id="announeContent"
            label={<Typography variant="h5">Announcement Content</Typography>}
            type="text"
            fullWidth
            name="addAnnounce"
            className={classes.root}
            style={{ marginBottom: '10px' }}
            value={announceContent}
            error={announceHelper.length > 0}
            helperText={announceHelper}
            onChange={(e) => updateContent(e.target.value)}
          />

          <div className={classes.addButton}>
            <Button
              variant="contained"
              className={classes.button2}
              color="secondary"
              type="submit"
              disabled={announceContent.length === 0}
            >
              Add Announcement
            </Button>
          </div>
        </form>
        <hr style={{ marginBottom: '30px' }} />
        <Typography className={classes.title}>Announcements</Typography>
        <Modal
          open={open}
          close={() => closeModal('edit')}
          change={(e) => updateContent(e.target.value)}
          update={(e) =>  editAnnouncement(e, index) }
          name={announceContent}
          component={announcements}
          index={index}
          type={'Announcement'}
          nameHelper={announceHelper}
        />
        <DeleteModal
          deleteOpen={deleteOpen}
          close={() => closeModal()}
          name={'this announcement'}
          type={'Announcement'}
          delete={(e) => deleteAnnouncement()}
        />
        {announceMap}
      </Grid>
    );
  
}
export default AnnounceAdmin;

