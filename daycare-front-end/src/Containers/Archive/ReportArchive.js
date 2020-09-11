import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './ArchiveStyles';
import moment from 'moment';
import Feeding from '../../Components/Feeding/Feeding';
import Diapering from '../../Components/Diapering/Diapering';
import Naptime from '../../Components/Naptime/Naptime';
import Meds from '../../Components/Meds/Meds';
import Playtime from '../../Components/Playtime/Playtime';
import Supplies from '../../Components/Supplies/Supplies';
import Comments from '../../Components/Comments/Comments';
import Typography from '@material-ui/core/Typography';
import { getReportArchive } from '../../Actions/ReportActions';
import { Grid } from '@material-ui/core';

const ReportArchive = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const token = useSelector((state) => state.appReducer.token);
  const report = useSelector((state) => state.reportReducer.report);
  const student = useSelector((state) => state.reportReducer.student);

  useEffect(() => {
    (async () => {
      dispatch(getReportArchive(id, token));
    })();
  }, []);

  return (
    <React.Fragment>
      <Grid container>
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
                // className={classes.center}
                style={{ marginBottom: '2rem' }}
              >
                <Typography>
                  <span className={classes.headers}>Date:</span>&nbsp;
                  {moment(report.createdAt).format('MM/DD/YYYY')}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                //className={classes.center}
                style={{ marginBottom: '2rem' }}
              >
                <Typography>
                  <span 
                  //className={classes.headers}
                  >
                    Student:</span>&nbsp;
                  {student.name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
               // className={classes.center}
                style={{ marginBottom: '2rem' }}
              >
                <Typography>
                  <span
                  // className={classes.headers}
                   >Report ID:</span>&nbsp;
                  {report.id}
                </Typography>
              </Grid>
            </React.Fragment>
          )}
          <Feeding report={report} type={'view'} />

          <Diapering report={report} type={'view'} />

          <Naptime report={report} type={'view'} />

          <Meds report={report} type={'view'} />

          <Playtime report={report} type={'view'} />

          <Supplies report={report} type={'view'} />
          <Comments report={report} type={'view'} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ReportArchive;
