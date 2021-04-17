import React from 'react';
import {
    Box,
    Grid,
    FilledInput,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    makeStyles,
    Button,
    IconButton,
    CircularProgress
} from "@material-ui/core";
import { Close as CloseButton } from "@material-ui/icons";
import { format } from 'date-fns';

const useStyles = makeStyles((theme)=>({
    info: {
        '&>*': {
            margin: '4px'
        },
    },
    skillChip:{
      margin : theme.spacing(0.5),
      padding : theme.spacing(0.75),
      fontSize : "14.5px",
      borderRadius : "5px",
      fontWeight : 600,
      backgroundColor : theme.palette.secondary.main,
      color:"#fff"
  },
}));

const ViewJobModal = (props) => {
    const classes = useStyles();
    return (
      <Dialog open={!!Object.keys(props.job).length} fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {props.job.title} @ {props.job.companyName}
            <IconButton>
              <CloseButton onClick={props.closeModal} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box className={classes.info} display="flex">
              <Typography variant="body2">Posted On: </Typography>
              <Typography variant="body2">{props.job.postedOn && format(props.job.postedOn,"dd/MM/yyyy HH:MM")}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
              <Typography variant="body2">Job Type: </Typography>
              <Typography variant="body2">{props.job.type}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
              <Typography variant="body2">Job Type: </Typography>
              <Typography variant="body2">{props.job.type}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
              <Typography variant="body2">Job Location: </Typography>
              <Typography variant="body2">{props.job.location}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
              <Typography variant="body2">Job description: </Typography>
              <Typography variant="body2">{props.job.description}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
              <Typography variant="body2">Comapny Name: </Typography>
              <Typography variant="body2">{props.job.companyName}</Typography>
            </Box>
            <Box className={classes.info} display="flex">
              <Typography variant="body2">Website: </Typography>
              <Typography variant="body2">{props.job.companyUrl}</Typography>
            </Box>
            <Box mt={0.5}>
              <Typography variant="body2">Skills: </Typography>
              <Grid container alignItems="center">
                {props.job.skills &&
                  props.job.skills.map((skill)=>(
                    <Grid item className = {classes.skillChip} key={skill}>{skill}</Grid>
                ))

                }
              </Grid>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" component='a' href={props.job.link} target="_blank">Apply</Button>

        </DialogActions>
      </Dialog>
    );
};

export default ViewJobModal;
