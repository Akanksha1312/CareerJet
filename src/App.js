import React, { useState, useEffect } from "react";
import { ThemeProvider, Grid, CircularProgress, Box, Button } from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import JobCard from "./components/Job/JobCard";
import NewJobModal from "./components/NewJobModal/NewJobModal";
import ViewJobModal from "./components/ViewJobModal/ViewJobModal";

// import JobData from "./dummyData";
import { firestore, app } from "./firebase/config";
import { Close as CloseIcon } from "@material-ui/icons";


const App = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false);
  const [customSearch, setCustomSearch] = useState(false);
  const [viewJob, setViewJob] = useState({});

  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .get();

    const tempJob = req.docs.map((Job) => ({
      ...Job.data(),
      id: Job.id,
      postedOn: Job.data().postedOn.toDate(),
    }));

    setJobs(tempJob);
    setLoading(false);
  };

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .where("type", "==", jobSearch.type)
      .where("location", "==", jobSearch.location)
      .get();

    const tempJob = req.docs.map((Job) => ({
      ...Job.data(),
      id: Job.id,
      postedOn: Job.data().postedOn.toDate(),
    }));

    setJobs(tempJob);
    setLoading(false);
  };

  const postJob = async (jobDetails) => {
    await firestore
      .collection("jobs")
      .add({
        ...jobDetails,
        postedOn: app.firestore.FieldValue.serverTimestamp(),
      });

    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={() => setNewJobModal(true)} />
      <NewJobModal
        closeModal={() => setNewJobModal(false)}
        newJobModal={newJobModal}
        postJob={postJob}
      />
      <ViewJobModal job={viewJob} closeModal={()=>setViewJob({})} />
      <Box mb={3}>
        <Grid container justify="center">
          <Grid item xs={10}>
            <SearchBar fetchJobsCustom={fetchJobsCustom} />

            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <>
                {customSearch &&
                  (
                  <Box display="flex" justifyContent="flex-end" my={2}>
                    <Button onClick={fetchJobs}>
                      <CloseIcon size={20} />
                      Custom Search
                    </Button>
                  </Box>
                )}
                {jobs.map((job) => 
                  (<JobCard open={()=>setViewJob(job)} key={job.id} {...job} />)
                )}
                
              </>
            )}
            {/* {JobData.map(job=><JobCard key={job.id} {...job} />)} */}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default App;
