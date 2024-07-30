import React, { useState } from 'react';
import { Button, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const Wrapper = styled('div')({
  padding: '20px',
  backgroundColor: '#f0f0f0',
  borderRadius: '10px',
});

const Title = styled('div')({
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
});

const DropArea = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: '2px dashed #aaa',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'border .3s ease-in-out',
  '&:hover': {
    borderColor: '#777',
  },
}));

const UploadIcon = styled(CloudUploadIcon)({
  fontSize: '64px',
  color: '#777',
});

const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setSelectedFiles(Array.from(event.dataTransfer.files));
  };

  const handleFileUpload = () => {
    setUploading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('files', file));

    // Replace 'YOUR_UPLOAD_URL' with your actual upload URL
axios.post(`${process.env.REACT_APP_API_HOST}/api/upload`, formData, {
  onUploadProgress: (progressEvent) => {
    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    setUploadProgress(progress);
  },
})

      .then((response) => {
        console.log('Files uploaded successfully:', response.data);
        // Reset states after successful upload
        setSelectedFiles([]);
        setUploading(false);
        setUploadProgress(0);
        setUploadError(null);
        setSuccessMessage('Files uploaded successfully!');
      },[successMessage])
      .catch((error) => {
        console.error('Error uploading files:', error);
        setUploadError('Error uploading files. Please try again.');
        setUploading(false);
        setUploadProgress(0);
      });
  };

  const handleCancelUpload = () => {
    // You can cancel the upload process here if needed
    // This requires cancel token functionality in axios
  };

  return (
    <Wrapper>
      <Title>Upload Price Docs</Title>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DropArea
            onDrop={handleFileDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <input
              type="file"
              accept="."
              style={{ display: 'none' }}
              onChange={handleFileChange}
              multiple
              id="file-input"
            />
            <label htmlFor="file-input">
              <UploadIcon />
              <Typography variant="h5" component="h2">
                {selectedFiles.length > 0 ? `${selectedFiles.length} files selected` : 'Drag & Drop or Click to Upload'}
              </Typography>
            </label>
          </DropArea>
        </Grid>
        {selectedFiles.length > 0 && (
          <Grid item xs={12}>
            <Paper>
              <Typography variant="h6" component="h3">
                Selected Files:
              </Typography>
              {selectedFiles.map((file) => (
                <Typography key={file.name} variant="body1">
                  {file.name} - {file.size} bytes
                </Typography>
              ))}
            </Paper>
          </Grid>
        )}
        {uploading && (
          <Grid item xs={12}>
            <CircularProgress
              variant="determinate"
              value={uploadProgress}
            />
            <Button variant="contained" color="secondary" onClick={handleCancelUpload}>
              Cancel Upload
            </Button>
          </Grid>
        )}
        {uploadError && (
          <Grid item xs={12}>
            <Typography variant="body1" color="error">
              {uploadError}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={selectedFiles.length === 0 || uploading}
            onClick={handleFileUpload}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default UploadFile;
