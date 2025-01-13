import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle as ValidIcon,
  Cancel as InvalidIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StatusCheck = ({ updateNavButtons }) => {
  const navigate = useNavigate();
  const [certificateId, setCertificateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof updateNavButtons === 'function') {
      const buttons = [
        <Button
          color="inherit"
          onClick={() => navigate('/')}
          key="home"
        >
          Home
        </Button>
      ];
      updateNavButtons(buttons);
    }

    return () => {
      if (typeof updateNavButtons === 'function') {
        updateNavButtons([]);
      }
    };
  }, [navigate, updateNavButtons]);

  const verificationSteps = [
    'Certificate ID Validation',
    'Blockchain Verification',
    'Issuer Authentication',
    'Status Check'
  ];

  const handleVerify = async () => {
    if (!certificateId.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    setError(null);
    setVerificationResult(null);

    try {
      // Simulate API call - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock verification result
      setVerificationResult({
        isValid: true,
        certificateDetails: {
          id: certificateId,
          recipientName: 'John Doe',
          issuedDate: '2024-03-15',
          issuer: 'Example University',
          course: 'Advanced Web Development',
          status: 'Valid',
          blockchainHash: '0x1234...5678',
          lastVerified: new Date().toISOString()
        }
      });
    } catch (err) {
      setError('Failed to verify certificate. Please try again.');
      setVerificationResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCertificateId('');
    setError(null);
    setVerificationResult(null);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Certificate Verification
        </Typography>
        
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Enter the certificate ID to verify its authenticity
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            label="Certificate ID"
            variant="outlined"
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            disabled={loading}
          />
          <Button
            variant="contained"
            onClick={handleVerify}
            disabled={loading || !certificateId.trim()}
            sx={{ minWidth: 120 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Verify'}
          </Button>
        </Box>

        {loading && (
          <Box sx={{ mt: 4 }}>
            <Stepper activeStep={1} alternativeLabel>
              {verificationSteps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}

        {verificationResult && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {verificationResult.isValid ? (
                  <ValidIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
                ) : (
                  <InvalidIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
                )}
                <Typography variant="h6">
                  Certificate {verificationResult.isValid ? 'Valid' : 'Invalid'}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'grid', gap: 2 }}>
                {Object.entries(verificationResult.certificateDetails).map(([key, value]) => (
                  <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2">{value}</Typography>
                      <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                        <IconButton size="small" onClick={() => handleCopy(value)}>
                          <CopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button
                  startIcon={<RefreshIcon />}
                  onClick={handleReset}
                  variant="outlined"
                >
                  Verify Another Certificate
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default StatusCheck;