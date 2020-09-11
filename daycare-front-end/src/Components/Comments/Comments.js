import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useStyles from './CommentStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const Supplies = (props) => {
  const classes = useStyles();
  return (
    <Grid item container xs={12} className={classes.componentBorder}>
      <Grid item xs={12}>
        <hr className={classes.divider}></hr>
      </Grid>
      <Grid item xs={12} className={classes.titleContainer}>
        <Typography color="secondary" className={classes.subTitle}>
          Comments
        </Typography>
      </Grid>
      {props.type === 'add' && (
        <Grid item container xs={12} className={classes.addContainer}>
          <Grid item sm={6} xs={12} className={classes.titleContainer}>
            <TextField
              variant="outlined"
              id="comment"
              name="comment"
              className={classes.root}
              multiline
              onChange={props.addChange}
              label="Comments"
              style={{ width: '40rem' }}
              value={props.comments.comment}
            ></TextField>
          </Grid>

          <Grid item sm={6} xs={12} className={classes.titleContainer}>
            <Button
              disabled={props.comments.comment.length === 0}
              color="secondary"
              className={classes.button}
              variant="contained"
              onClick={props.addComment}
            >
              Add Comment
            </Button>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12}>
        <hr className={classes.divMargin}></hr>
      </Grid>
      <Grid item container xs={12}>
        <Grid
          item
          sm={props.type === 'add' ? 8 : 12}
          xs={12}
          className={classes.titleContainer}
        >
          <Typography color="secondary">Comment</Typography>
        </Grid>

        <Grid item xs={12}>
          <hr className={classes.lineSpacing}></hr>
        </Grid>
      </Grid>
      {props.report &&
        props.report.comments.map((comment) => {
          return (
            <Grid item container xs={12}>
              <Grid
                item
                sm={props.type === 'add' ? 8 : 12}
                xs={12}
                className={classes.titleContainer}
              >
                <Typography>{comment.comment}</Typography>
              </Grid>
              {props.type === 'add' && (
                <Grid item sm={4} xs={12} className={classes.mobileButtons}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      props.open('edit', 'Comments', comment.id, comment)
                    }
                    style={{ marginRight: '2rem' }}
                    className={classes.button}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => props.open('delete', 'Comments', comment.id)}
                    className={classes.button}
                  >
                    Delete
                  </Button>
                </Grid>
              )}

              <Grid item xs={12}>
                <hr className={classes.lineSpacing}></hr>
              </Grid>
            </Grid>
          );
        })}
    </Grid>
  );
};
export default Supplies;
