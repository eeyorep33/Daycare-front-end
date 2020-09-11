import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, getSearch } from '../../Actions/StudentActions';
import useStyles from './ArchiveStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Archive = (props) => {
  const classes = useStyles();
  const token = useSelector((state) => state.appReducer.token);
  const facility = useSelector((state) => state.appReducer.facilityId);
  const students = useSelector((state) => state.studentReducer.students);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(getStudents(token, facility));
    })();
  }, []);

  const updateContent = (e) => {
    setSearch(e);
  };

  const searchStudent = () => {
    dispatch(getSearch(token, facility, search));
    setSearch('');
  };

  const compare = (a, b) => {
    var aName = a.name.split(' ');
    var bName = b.name.split(' ');

    var aLastName = aName[aName.length - 1];
    var bLastName = bName[bName.length - 1];

    if (aLastName < bLastName) return -1;
    if (aLastName > bLastName) return 1;
    return 0;
  };
  return (
    <React.Fragment>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item container xs={4}>
            <Grid
              item
              xs={6}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography style={{ marginLeft: '2rem' }}>
                Search for Student
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.searchContainer}>
              <TextField
                className={classes.root}
                variant="outlined"
                id="name"
                name="name"
                onChange={(e) => updateContent(e.target.value)}
                label="Student Name"
                value={search}
              ></TextField> 
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchStudent()}
                className={classes.button}
              >
                Search
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Typography color="secondary" className={classes.title}>
              List of students
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <hr className={classes.divMargin} />
          </Grid>

          {students &&
            students.sort(compare).map((student) => {
              return (
                <Grid item xs={12}>
                  <Button
                    disableRipple
                    component={Link}
                    to={'/report/list/' + student.id}
                    className={classes.reportButton}
                  >
                    {student.name}
                  </Button>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Archive;
