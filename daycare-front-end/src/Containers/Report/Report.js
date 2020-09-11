import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  editFeeding,
  addFeeding,
  deleteFeeding,
  getReport,
  editDiapering,
  addDiapering,
  deleteDiapering,
  editNap,
  addNaptime,
  deleteNap,
  editComment,
  addComment,
  deleteComment,
  addMeds,
  editMeds,
  deleteMeds,
  addSupplies,
  editSupplies,
  deleteSupplies,
  addPlaytime,
  editPlaytime,
  deletePlaytime,
} from '../../Actions/ReportActions';

import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import useStyles from './ReportStyles';
import Typography from '@material-ui/core/Typography';
import DeleteModal from '../../Components/Modals/DeleteModal';
import ReportModal from '../../Components/Modals/ReportModal';
import Feeding from '../../Components/Feeding/Feeding';
import Diapering from '../../Components/Diapering/Diapering';
import Naptime from '../../Components/Naptime/Naptime';
import Meds from '../../Components/Meds/Meds';
import Playtime from '../../Components/Playtime/Playtime';
import Supplies from '../../Components/Supplies/Supplies';
import Comments from '../../Components/Comments/Comments';
import { Button } from '@material-ui/core';

const Report = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const token = useSelector((state) => state.appReducer.token);
  const report = useSelector((state) => state.reportReducer.report);
  const student = useSelector((state) => state.reportReducer.student);
  const [feeding, setFeeding] = useState({
    amount: '',
    time: moment(),
    food: '',
  });
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [componentName, setComponentName] = useState('');
  const [componentId, setComponentId] = useState('');
  const [component, setComponent] = useState('');

  const [type, setType] = useState('');
  const [diapering, setDiapering] = useState({
    time: moment(),
    type: '',
  });
  const [naptime, setNaptime] = useState({
    start_time: moment(),
    end_time: moment(),
  });
  const [playTime, setPlayTime] = useState({
    activity: '',
  });
  const [meds, setMeds] = useState({
    name: '',
    time: moment(),
    dosage: '',
  });
  const [comments, setComments] = useState({
    comment: '',
  });
  const [supplies, setSupplies] = useState({
    supply_item: '',
  });

  const format = 'h:mm a';
  const now = moment().hour(6).minute(30);
  const date = moment().format('MM/DD/YYYY');

  useEffect(() => {
    (async () => {
      dispatch(getReport(id, token));
    })();
  }, []);

  const closeModal = (type) => {
    if (type === 'edit') {
      setEditOpen(false);
      setComponent('');
      setComponentId('');
      setComponentName('');
    } else {
      setDeleteOpen(false);
      setComponentName('');
      setComponentId('');
    }
  };

  const openModal = (type, name, id, component) => {
    if (type === 'edit') {
      setEditOpen(true);
      setComponentId(id);
      setComponentName(name);
      setComponent(component);
    } else {
      setType(name);
      setComponentName(' this ' + name);
      setComponentId(id);
      setDeleteOpen(true);
    }
  };

  const addTime = (value, type, name) => {
    switch (type) {
      case 'feeding':
        setFeeding({ ...feeding, time: value });
        break;
      case 'diapering':
        setDiapering({ ...diapering, time: value });
        break;
      case 'meds':
        setMeds({ ...meds, time: value });
        break;
      case 'nap':
        if (name === 'start') {
          setNaptime({ ...naptime, start_time: value });
        } else {
          setNaptime({ ...naptime, end_time: value });
        }
        break;

      default:
        return null;
    }
  };

  const updateTime = (value, name) => {
    switch (componentName) {
      case 'Feeding':
      case 'Diapering':
      case 'Meds':
        setComponent({ ...component, time: value });
        break;
      case 'Naptime':
        if (name === 'start') {
          setComponent({ ...component, start_time: value });
        } else {
          setComponent({ ...component, end_time: value });
        }
        break;
      default:
        return null;
    }
  };
  const updateNapstart = (value) => {
    setComponent({ ...component, start_time: value });
  };

  const updateNapEnd = (value) => {
    setComponent({ ...component, end_time: value });
  };
  const addFeed = () => {
    let newFeeding = {
      amount: feeding.amount,
      food: feeding.food,
      time: feeding.time.format('HH:mm'),
      reportId: report.id,
    };

    dispatch(addFeeding(newFeeding, token));
    setFeeding({ ...feeding, amount: '', food: '' });
  };

  const addMedicine = () => {
    let newMed = {
      dosage: meds.dosage,
      name: meds.name,
      time: meds.time.format('HH:mm'),
      reportId: report.id,
    };

    dispatch(addMeds(newMed, token));
    setMeds({ ...meds, dosage: '', name: '' });
  };

  const addCom = () => {
    let newComment = {
      comment: comments.comment,
      reportId: report.id,
    };

    dispatch(addComment(newComment, token));
    setComments({ ...comments, comment: '' });
  };

  const addPlay = () => {
    let newPlay = {
      activity: playTime.activity,
      reportId: report.id,
    };

    dispatch(addPlaytime(newPlay, token));
    setPlayTime({ ...playTime, activity: '' });
  };

  const addSupply = () => {
    let newSupply = {
      supply_item: supplies.supply_item,
      reportId: report.id,
    };

    dispatch(addSupplies(newSupply, token));
    setSupplies({ ...supplies, supply_item: '' });
  };
  const addDiaper = () => {
    let newDiapering = {
      type: diapering.type,
      time: diapering.time.format('HH:mm'),
      reportId: report.id,
    };

    dispatch(addDiapering(newDiapering, token));
    setDiapering({ ...diapering, type: '' });
  };

  const addNap = () => {
    let newNap = {
      start_time: naptime.start_time.format('HH:mm'),
      end_time: naptime.end_time.format('HH:mm'),
      reportId: report.id,
    };

    dispatch(addNaptime(newNap, token));
  };

  const editComponent = () => {
    let time;
    let endTime;
    if (
      componentName === 'Feeding' ||
      componentName === 'Diapering' ||
      componentName === 'Meds'
    ) {
      if (typeof component.time === 'string') {
        time = moment(component.time, 'HH:mm').format('HH:mm');
      } else {
        time = component.time.format('HH:mm');
      }
    }
    if (componentName === 'Naptime') {
      if (typeof component.start_time === 'string') {
        time = moment(component.start_time, 'HH:mm').format('HH:mm');
      } else {
        time = component.start_time.format('HH:mm');
      }
      if (typeof component.end_time === 'string') {
        endTime = moment(component.end_time, 'HH:mm').format('HH:mm');
      } else {
        endTime = component.end_time.format('HH:mm');
      }
    }
    switch (componentName) {
      case 'Feeding':
        let updatedFeed = {
          amount: component.amount,
          food: component.food,
          time: time,
          reportId: report.id,
        };
        dispatch(editFeeding(updatedFeed, componentId, token));
        break;
      case 'Diapering':
        let updatedDiapering = {
          time: time,
          reportId: report.id,
          type: component.type,
        };
        dispatch(editDiapering(updatedDiapering, componentId, token));
        break;
      case 'Naptime':
        let updatedNap = {
          start_time: time,
          end_time: endTime,
          reportId: report.id,
        };
        dispatch(editNap(updatedNap, componentId, token));
        break;
      case 'Meds':
        let updatedMeds = {
          dosage: component.dosage,
          name: component.name,
          time: time,
          reportId: report.id,
        };
        dispatch(editMeds(updatedMeds, componentId, token));
        break;
      case 'Playtime':
        let updatedPlay = { activity: component.activity, reportId: report.id };
        dispatch(editPlaytime(updatedPlay, componentId, token));
        break;
      case 'Comments':
        let updatedComment = {
          comment: component.comment,
          reportId: report.id,
        };
        dispatch(editComment(updatedComment, componentId, token));
        break;
      case 'Supplies':
        let updatedSupplies = {
          supply_item: component.supply_item,
          reportId: report.id,
        };
        dispatch(editSupplies(updatedSupplies, componentId, token));
        break;
      default:
        return null;
    }
    closeModal('edit');
  };

  const deleteComponent = () => {
    switch (type) {
      case 'Feeding':
        dispatch(deleteFeeding(componentId, token));
        break;
      case 'Diapering':
        dispatch(deleteDiapering(componentId, token));
        break;
      case 'Naptime':
        dispatch(deleteNap(componentId, token));
        break;
      case 'Meds':
        dispatch(deleteMeds(componentId, token));
        break;
      case 'Supplies':
        dispatch(deleteSupplies(componentId, token));
        break;
      case 'Playtime':
        dispatch(deletePlaytime(componentId, token));
        break;
      case 'Comments':
        dispatch(deleteComment(componentId, token));
        break;
      default:
        return null;
    }
    closeModal('delete');
  };
  const updateReport = (e) => {
    setComponent({ ...component, [e.target.name]: e.target.value });
  };

  const addChange = (e, type) => {
    switch (type) {
      case 'Feeding':
        setFeeding({ ...feeding, [e.target.name]: e.target.value });
        break;
      case 'Diapering':
        setDiapering({ ...diapering, [e.target.name]: e.target.value });
        break;
      case 'Meds':
        setMeds({ ...meds, [e.target.name]: e.target.value });
        break;
      case 'Comments':
        setComments({ ...comments, [e.target.name]: e.target.value });
        break;
      case 'Supplies':
        setSupplies({ ...supplies, [e.target.name]: e.target.value });
        break;
      case 'Playtime':
        setPlayTime({ ...playTime, [e.target.name]: e.target.value });
        break;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Grid container>
        {student && (
          <Grid item xs={12}>
            <Button
              component={Link}
              to={'/classroom/' + student.classroomId}
              style={{ marginLeft: '2rem' }}
              variant="contained"
              className={classes.button}
              color="secondary"
            >
              Back
            </Button>
          </Grid>
        )}
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography className={classes.title} color="secondary">
            Daily Report
          </Typography>
        </Grid>
        <Grid container item xs={12}>
          {report && (
            <React.Fragment>
              <Grid
                item
                xs={12}
                className={classes.center}
                style={{ marginBottom: '2rem' }}
              >
                <Typography>
                  <span className={classes.headers}>Date:</span>&nbsp;{date}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.center}
                style={{ marginBottom: '2rem' }}
              >
                <Typography>
                  <span className={classes.headers}>Student:</span>&nbsp;
                  {student.name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                className={classes.center}
                style={{ marginBottom: '2rem' }}
              >
                <Typography>
                  <span className={classes.headers}>Report ID:</span>&nbsp;
                  {report.id}
                </Typography>
              </Grid>
            </React.Fragment>
          )}
          <DeleteModal
            deleteOpen={deleteOpen}
            close={() => closeModal('delete')}
            name={componentName}
            delete={deleteComponent}
            type={type}
          />
          <ReportModal
            open={editOpen}
            close={() => closeModal('edit')}
            name={componentName}
            component={component}
            change={updateReport}
            update={editComponent}
            time={updateTime}
            napStart={updateNapstart}
            napEnd={updateNapEnd}
          />
        </Grid>

        <Feeding
          open={openModal}
          report={report}
          addChange={(e) => addChange(e, 'Feeding')}
          feeding={feeding}
          addTime={(value) => addTime(value, 'feeding')}
          addFeed={addFeed}
          deleteOpen={openModal}
          type={'add'}
        />

        <Diapering
          open={openModal}
          report={report}
          addChange={(e) => addChange(e, 'Diapering')}
          diapering={diapering}
          addTime={(value) => addTime(value, 'diapering')}
          addDiaper={addDiaper}
          deleteOpen={openModal}
          type={'add'}
        />

        <Naptime
          open={openModal}
          report={report}
          addChange={(e) => addChange(e, 'Naptime')}
          naptime={naptime}
          addTime={addTime}
          addNap={addNap}
          deleteOpen={openModal}
          type={'add'}
        />

        <Meds
          open={openModal}
          report={report}
          addChange={(e) => addChange(e, 'Meds')}
          meds={meds}
          addTime={addTime}
          addMeds={addMedicine}
          type={'add'}
          deleteOpen={openModal}
        />

        <Playtime
          open={openModal}
          report={report}
          addChange={(e) => addChange(e, 'Playtime')}
          play={playTime}
          addPlay={addPlay}
          type={'add'}
          deleteOpen={openModal}
        />

        <Supplies
          open={openModal}
          report={report}
          addChange={(e) => addChange(e, 'Supplies')}
          supplies={supplies}
          addSupply={addSupply}
          type={'add'}
          deleteOpen={openModal}
        />
        <Comments
          open={openModal}
          report={report}
          addChange={(e) => addChange(e, 'Comments')}
          comments={comments}
          addComment={addCom}
          type={'add'}
          deleteOpen={openModal}
        />
      </Grid>
    </React.Fragment>
  );
};

export default Report;
