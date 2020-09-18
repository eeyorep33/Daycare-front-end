import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportList } from '../../Actions/ReportActions';
import useStyles from './ArchiveStyles';
import { Grid } from '@material-ui/core';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const ReportList = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.appReducer.token);
  const reportList = useSelector((state) => state.reportReducer.reportList);
  const id = props.match.params.id;

  useEffect(() => {
    (async () => {
      dispatch(getReportList(id, token));
    })();
  }, []);

  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container>
        {reportList &&
          reportList.map((report) => {
            return (
              <Grid item xs={12}>
                <Button
                  disableRipple
                  component={Link}
                  to={'/report/archive/' + report.id}
                  color="secondary"
                  className={classes.reportButton}
                >
                  {moment(report.createdAt).format('MM/DD/YYYY')}
                </Button>
              </Grid>
            );
          })}
      </Grid>
    </React.Fragment>
  );
};

export default ReportList;
