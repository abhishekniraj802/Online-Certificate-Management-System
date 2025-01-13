import React, { useEffect } from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Button,
  IconButton,
  Tooltip,
  Stack 
} from '@mui/material';
import {
  Download as DownloadIcon,
  ArrowBack as ArrowBackIcon,
  Print as PrintIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CertificatePreview = ({ template, data, updateNavButtons }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof updateNavButtons === 'function') {
      const buttons = [
        <Tooltip title="Back" key="back">
          <Button
            color="inherit"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Tooltip>,
        <Tooltip title="Download Certificate" key="download">
          <Button
            color="inherit"
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
        </Tooltip>
      ];
      updateNavButtons(buttons);
    }

    return () => {
      if (typeof updateNavButtons === 'function') {
        updateNavButtons([]);
      }
    };
  }, [navigate, updateNavButtons]);

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download certificate');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share certificate');
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Paper 
        elevation={3}
        sx={{
          width: '100%',
          aspectRatio: '1.414', // A4 ratio
          p: 4,
          background: `url(${template?.background}) no-repeat center/cover`,
          '@media print': {
            boxShadow: 'none',
          }
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{ 
              fontFamily: template?.titleFont || 'inherit',
              color: template?.titleColor || 'inherit'
            }}
          >
            Certificate of {data?.title}
          </Typography>
          
          <Typography variant="h5" gutterBottom>
            This is to certify that
          </Typography>
          
          <Typography 
            variant="h4" 
            sx={{ 
              my: 4, 
              fontStyle: 'italic',
              fontFamily: template?.nameFont || 'inherit',
              color: template?.nameColor || 'inherit'
            }}
          >
            {data?.recipientName}
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: '80%', 
              mb: 4,
              fontFamily: template?.bodyFont || 'inherit',
              color: template?.bodyColor || 'inherit'
            }}
          >
            {data?.description}
          </Typography>
          
          <Typography variant="body2">
            Issued on: {data?.issuanceDate ? new Date(data.issuanceDate).toLocaleDateString() : ''}
          </Typography>
        </Box>
      </Paper>

      {/* Action buttons - hidden when printing */}
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16,
          '@media print': {
            display: 'none'
          }
        }}
      >
        <Tooltip title="Print">
          <IconButton onClick={handlePrint} size="small">
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton onClick={handleShare} size="small">
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default CertificatePreview;