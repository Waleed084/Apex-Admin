import React from 'react';
import { Grid } from '@mui/material';
import PriceUpload from './PriceUpload'; // Import the PriceUpload component
import UploadFile from './UploadFile'; // Import the UploadFile component

const PriceDocSystem = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PriceUpload /> {/* Show the PriceUpload component */}
      </Grid>
      <Grid item xs={12}>
        <UploadFile /> {/* Show the UploadFile component */}
      </Grid>
    </Grid>
  );

export default PriceDocSystem;
