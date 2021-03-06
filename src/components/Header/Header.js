import React from "react";
import {Box, Grid, Typography, Button} from "@material-ui/core";


const Header = (props) => (
    <Box py ={10} bgcolor = "secondary.main" color="white">
      <Grid container justify = "center">
        <Grid item xs = {10}>
          <Box display="flex" justifyContent = "space-between">
            <Typography variant="h4"> CareerJet </Typography>
          <Button onClick={props.openNewJobModal} variant="contained" color = "primary" disableElevation>   Post a Job </Button>
          </Box>
        </Grid>
      </Grid>
        
    </Box>
);

export default Header;