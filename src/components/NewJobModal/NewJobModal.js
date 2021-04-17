import React, { useState } from "react";
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


const useStyles = makeStyles((theme) => ({
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    cursor: "pointer",

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },

  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const initState = {
  title: "",
  type: "Full Time",
  location: "Remote",
  companyName: "",
  companyUrl: "",
  skills: [],
  link: "",
  description: "",
};

const NewJobModal = (props) => {
  const [loading, setLoading] = useState();
  const [jobDetails, setJobDetails] = useState(initState);

  const handleChange = (e) => {
    e.persist();
    setJobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };
  
  const addOrRemoveSkills = (skill) => {
    jobDetails.skills.includes(skill)
      ? setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill),
        }))
      : //remove from array
        setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill),
        }));
    //add in array
  };
  
  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === 'string' && !jobDetails[field]) return;// console.log("not validated");
    }
    if (!jobDetails.skills.length) return;
    // return console.log("validated");
    setLoading(true);
    await props.postJob(jobDetails);
    closeModal();
  };

  const closeModal = () => {
    setJobDetails(initState);
    setLoading(false);
    props.closeModal();
  }
  const skills = [
    "Javascript",
    "React",
    "Node",
    "Vue",
    "Firebase",
    "MongoDB",
    "SQL",
  ];

  //console.log(jobDetails);
  const classes = useStyles();
  return (
    <Dialog fullWidth open={props.newJobModal}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post a Job
          <IconButton onClick={closeModal}>
            <CloseButton />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="title"
              value={jobDetails.title}
              autoComplete="off"
              placeholder="Job Title*"
              disableUnderline
              fullWidth
            ></FilledInput>
          </Grid>
          <Grid item xs={6}>
            <Select
              name="type"
              onChange={handleChange}
              value={jobDetails.type}
              fullWidth
              variant="filled"
              disableUnderLine
            >
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              name="companyName"
              onChange={handleChange}
              value={jobDetails.companyName}
              autoComplete="off"
              placeholder="Company Name*"
              disableUnderline
              fullWidth
            ></FilledInput>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              name="companyUrl"
              onChange={handleChange}
              value={jobDetails.companyUrl}
              autoComplete="off"
              placeholder="Company URL*"
              disableUnderline
              fullWidth
            ></FilledInput>
          </Grid>
          <Grid item xs={6}>
            <Select
              name="location"
              onChange={handleChange}
              value={jobDetails.location}
              fullWidth
              disableUnderLine
              variant="filled"
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="In-Office">In-Office</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              name="link"
              onChange={handleChange}
              value={jobDetails.link}
              autoComplete="off"
              placeholder="Job Link*"
              disableUnderline
              fullWidth
            ></FilledInput>
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              name="description"
              onChange={handleChange}
              value={jobDetails.description}
              autoComplete="off"
              placeholder="Job Description*"
              disableUnderline
              fullWidth
              multiline
              rows={4}
            ></FilledInput>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography>Skills*</Typography>
          <Box display="flex">
            {skills.map((skills) => (
              <Box
                onClick={() => addOrRemoveSkills(skills)}
                className={`${classes.skillChip} ${jobDetails.skills.includes(skills) && classes.included}`}
                key={skills}
              >
                {skills}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">*Required skills</Typography>
          <Button disabled={loading} onClick={handleSubmit} variant="contained" color="primary" disableElevation>
            {loading ? <CircularProgress color="secondary" size={22} /> : "Post Job"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewJobModal;
