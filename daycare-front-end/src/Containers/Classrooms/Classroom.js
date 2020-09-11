import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStudentsByClass,
  updateImage,
  checkIn,
  checkOut,
} from '../../Actions/StudentActions';
import StudentDetails from '../../Components/Modals/StudentDetails';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './ClassroomStyles';
import Typography from '@material-ui/core/Typography';

const Classroom = (props) => {
  const classes = useStyles();
  const [openModal, setopenModal] = useState(false);
  const [student, setStudent] = useState('');
  const students = useSelector((state) => state.studentReducer.classStudents);
  const classroom = useSelector((state) => state.studentReducer.classroom);
  const token = useSelector((state) => state.appReducer.token);
  const facility = useSelector((state) => state.appReducer.facilityId);
  const id = props.match.params.id;
  const [newImage, setNewImage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(getStudentsByClass(token, facility, id));
    })();
     //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const studentDetails = (student) => {
    setStudent(student);
    setopenModal(true);
  };

  const updateStudentImage = () => {
    const formData = new FormData();
    formData.append('image', newImage);
    dispatch(updateImage(student.id, token, formData));
    setopenModal(false);
    setNewImage('');
  };

  const checkInStudent = (id) => {
    dispatch(checkIn(id, token));
  };
  const checkOutStudent = (id) => {
    dispatch(checkOut(id, token));
  };
  return (
    <React.Fragment>
      <StudentDetails
        open={openModal}
        student={student}
        newImage={newImage}
        classroom={classroom}
        drop={(file, text) => setNewImage(file)}
        close={() => setopenModal(false)}
        update={updateStudentImage}
      />

      {classroom && (
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography color="secondary" className={classes.title}>
            {classroom.name}
          </Typography>
        </Grid>
      )}
      {students &&
        students.map((student) => {
          return (
            <React.Fragment>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  style={{ marginTop: '2rem', marginBottom: '2rem' }}
                ></Grid>
                <Grid item xs={12} sm={6} className={classes.mobile}>
                  <Typography className={classes.studentList} color="secondary">
                    {student.name}
                  </Typography>
                </Grid>
                <Grid container item xs={12} sm={6}>
                  <Grid item xs={4} className={classes.mobileContainer}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => studentDetails(student)}
                      className={classes.button}
                    >
                      View Student
                    </Button>
                  </Grid>
                  <Grid item xs={4} className={classes.mobileContainer}>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to={'/report/' + student.id}
                      disabled={!student.checked_in}
                      className={classes.button}
                    >
                      View Report
                    </Button>
                  </Grid>
                  <Grid item xs={4} className={classes.mobileContainer}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        student.checked_in
                          ? checkOutStudent(student.id)
                          : checkInStudent(student.id)
                      }
                      color="secondary"
                      className={classes.button}
                    >
                      {student.checked_in ? 'Check Out' : 'Check In'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <hr></hr>
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default Classroom;

// import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
// import { withStyles } from '@material-ui/styles';
// import Typography from '@material-ui/core/Typography';

// import { connect } from 'react-redux';
// import Grid from '@material-ui/core/Grid';
// import styles from './ClassroomStyles'
// import { getStudentsByClass } from '../../Actions/StudentActions'
// import { getClassrooms } from '../../Actions/ClassroomActions'

// class Classroom extends Component {

//     componentDidMount() {
//         this.props.getStudents(this.props.token, this.props.facilityId, this.props.match.params.id)

//     }
//     render() {
//         return(
//             <React.Fragment>
// {this.props.listOfStudents && this.props.listOfStudents.map(student => {
//     return (<React.Fragment>
//         <Grid container >
//             <Grid item xs={6}>
//             {student.name}
//                 </Grid>
//                 <Grid container item xs={6}>
// <Grid item xs={4}>
// <Button>View Student</Button>
// </Grid>
// <Grid item xs={4}>
// <Button>View Report</Button>
// </Grid>
// <Grid item xs={4}>
// <Button>Check In</Button>
// </Grid>
//                 </Grid>
//                 </Grid>
//                 <hr></hr>
//         </React.Fragment>)
// })}
//             </React.Fragment>
//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         isAuth: state.appReducer.isAuth,
//         token: state.appReducer.token,
//         user: state.appReducer.user,
//         facilityId: state.appReducer.facilityId,
//         students: state.studentReducer.students,
//         studentError: state.studentReducer.studentError,
//         classrooms: state.classReducer.classrooms,
//         listOfStudents: state.studentReducer.classStudents
//     }
//     }

// const mapDispatchToProps = dispatch => {
//     return {
//     getStudents: (token, facility, id) => dispatch(getStudentsByClass(token, facility, id)),
//     clearError: () => dispatch({ type: 'CLEAR_STUDENT_ERROR' }),
//     getClassrooms: (token, facilityId) => dispatch(getClassrooms(token, facilityId)),

//     }

//   }

//   export default withStyles(styles)(
//     connect(mapStateToProps, mapDispatchToProps)(Classroom)
// )
