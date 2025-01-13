// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   IconButton,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   LinearProgress,
//   Chip,
//   Tooltip,
//   TextField,
//   Snackbar,
//   Alert,
//   Divider,
// } from '@mui/material';
// import {
//   CloudDownload as DownloadIcon,
//   Visibility as ViewIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
//   FilterList as FilterIcon,
//   Assessment as AssessmentIcon,
//   PendingActions as PendingIcon,
//   CheckCircle as ApprovedIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { getAll, addCertificate, downloadCertificate } from '../../service';

// // Stats Card Component with Animation
// const StatsCard = ({ icon: Icon, title, value, color, trend }) => (
//   <Card 
//     sx={{ 
//       height: '100%',
//       transition: 'transform 0.2s',
//       '&:hover': {
//         transform: 'translateY(-5px)',
//         boxShadow: 3
//       }
//     }}
//   >
//     <CardContent>
//       <Box display="flex" alignItems="center" mb={2}>
//         <Icon sx={{ color, fontSize: 40, mr: 2 }} />
//         <Typography variant="h6" color="textSecondary">
//           {title}
//         </Typography>
//       </Box>
//       <Typography variant="h4" sx={{ color }}>
//         {value}
//       </Typography>
//       {trend && (
//         <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//           {trend}
//         </Typography>
//       )}
//     </CardContent>
//   </Card>
// );

// // Certificate Card Component with Enhanced UI
// const CertificateCard = ({ certificate, onView, onDownload }) => (
//   <Card 
//     sx={{ 
//       height: '100%',
//       transition: 'transform 0.2s',
//       '&:hover': {
//         transform: 'translateY(-5px)',
//         boxShadow: 3
//       }
//     }}
//   >
//     <CardContent>
//       <Box display="flex" justifyContent="space-between" alignItems="flex-start">
//         <Typography variant="h6" gutterBottom>
//           {certificate.certificateName}
//         </Typography>
//         <Chip
//           label={certificate.authorized ? "Approved" : "Pending"}
//           color={certificate.authorized ? "success" : "warning"}
//           size="small"
//         />
//       </Box>
      
//       <Typography color="textSecondary" gutterBottom>
//         {certificate.issuer}
//       </Typography>
      
//       <Divider sx={{ my: 1.5 }} />
      
//       <Box sx={{ mt: 2 }}>
//         <Typography variant="body2" color="textSecondary">
//           Issued: {new Date(certificate.date).toLocaleDateString()}
//         </Typography>
//         {certificate.description && (
//           <Typography 
//             variant="body2" 
//             color="textSecondary" 
//             sx={{ 
//               mt: 1,
//               display: '-webkit-box',
//               WebkitLineClamp: 2,
//               WebkitBoxOrient: 'vertical',
//               overflow: 'hidden'
//             }}
//           >
//             {certificate.description}
//           </Typography>
//         )}
//       </Box>

//       <Box sx={{ 
//         mt: 2, 
//         display: 'flex', 
//         justifyContent: 'flex-end', 
//         gap: 1 
//       }}>
//         <Tooltip title="View Details">
//           <IconButton 
//             onClick={() => onView(certificate)}
//             size="small"
//             color="primary"
//           >
//             <ViewIcon />
//           </IconButton>
//         </Tooltip>
//         {certificate.authorized && (
//           <Tooltip title="Download Certificate">
//             <IconButton 
//               onClick={() => onDownload(certificate)}
//               size="small"
//               color="secondary"
//             >
//               <DownloadIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </Box>
//     </CardContent>
//   </Card>
// );

// // Main Dashboard Component
// const UserDashboard = ({ updateNavButtons }) => {
//   const navigate = useNavigate();
//   const [certificates, setCertificates] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [notification, setNotification] = useState({
//     open: false,
//     message: '',
//     type: 'info'
//   });

//   useEffect(() => {
//     fetchCertificates();
//     setupNavigation();
//   }, []);

//   const setupNavigation = () => {
//     if (typeof updateNavButtons === 'function') {
//       const buttons = [
//         <Button
//           key="request"
//           color="inherit"
//           onClick={() => navigate('/user/request')}
//           startIcon={<AddIcon />}
//         >
//           Request Certificate
//         </Button>
//       ];
//       updateNavButtons(buttons);
//     }
//   };

//   const fetchCertificates = async () => {
//     try {
//       setLoading(true);
//       const response = await getAll();
//       setCertificates(response);
//     } catch (err) {
//       setError('Failed to load certificates');
//       showNotification('Error loading certificates', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = async (certificate) => {
//     try {
//       await downloadCertificate(certificate.id);
//       showNotification('Certificate downloaded successfully', 'success');
//     } catch (err) {
//       showNotification('Failed to download certificate', 'error');
//     }
//   };

//   const showNotification = (message, type = 'info') => {
//     setNotification({ open: true, message, type });
//   };

//   const handleCloseNotification = () => {
//     setNotification(prev => ({ ...prev, open: false }));
//   };

//   const filteredCertificates = certificates.filter(cert =>
//     cert.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) return <LinearProgress />;

//   if (error) {
//     return (
//       <Container>
//         <Paper sx={{ p: 3, textAlign: 'center', mt: 4 }}>
//           <Typography color="error">{error}</Typography>
//           <Button onClick={fetchCertificates} sx={{ mt: 2 }}>
//             Retry
//           </Button>
//         </Paper>
//       </Container>
//     );
//   }

//   const totalCertificates = certificates.length;
//   const approvedCertificates = certificates.filter(cert => cert.authorized).length;
//   const pendingCertificates = totalCertificates - approvedCertificates;

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {/* Welcome Section */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h4" gutterBottom>
//           Welcome, {localStorage.getItem('userName')}
//         </Typography>
//         <Typography color="textSecondary">
//           Manage your certificates and requests
//         </Typography>
//       </Box>

//       {/* Statistics Section */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} md={4}>
//           <StatsCard
//             icon={AssessmentIcon}
//             title="Total Certificates"
//             value={totalCertificates}
//             color="primary.main"
//             trend={`${totalCertificates} total certificates`}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <StatsCard
//             icon={ApprovedIcon}
//             title="Approved"
//             value={approvedCertificates}
//             color="success.main"
//             trend={`${approvedCertificates} approved certificates`}
//           />
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <StatsCard
//             icon={PendingIcon}
//             title="Pending"
//             value={pendingCertificates}
//             color="warning.main"
//             trend={`${pendingCertificates} pending requests`}
//           />
//         </Grid>
//       </Grid>

//       {/* Search Section */}
//       <Paper sx={{ p: 2, mb: 3 }}>
//         <TextField
//           fullWidth
//           placeholder="Search certificates..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
//           }}
//         />
//       </Paper>

//       {/* Certificates Grid */}
//       <Grid container spacing={3}>
//         {filteredCertificates.map((certificate) => (
//           <Grid item xs={12} sm={6} md={4} key={certificate.id}>
//             <CertificateCard
//               certificate={certificate}
//               onView={() => navigate(`/user/certificates/${certificate.id}`)}
//               onDownload={handleDownload}
//             />
//           </Grid>
//         ))}
//         {filteredCertificates.length === 0 && (
//           <Grid item xs={12}>
//             <Paper sx={{ p: 3, textAlign: 'center' }}>
//               <Typography color="textSecondary">
//                 No certificates found. Try adjusting your search or request a new certificate.
//               </Typography>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => navigate('/user/request')}
//                 sx={{ mt: 2 }}
//               >
//                 Request Certificate
//               </Button>
//             </Paper>
//           </Grid>
//         )}
//       </Grid>

//       {/* Notifications */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.type}
//           variant="filled"
//           sx={{ width: '100%' }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default UserDashboard;


import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Chip,
  Tooltip,
  TextField,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import {
  CloudDownload as DownloadIcon,
  Visibility as ViewIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Assessment as AssessmentIcon,
  PendingActions as PendingIcon,
  CheckCircle as ApprovedIcon,
  Print as PrintIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { getAll, downloadCertificate } from '../../service';
import { LineChart, PieChart } from '../Common/Charts';

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, color, trend }) => (
  <Card 
    sx={{ 
      height: '100%',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: 3
      }
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <Icon sx={{ color, fontSize: 40, mr: 2 }} />
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" sx={{ color }}>
        {value}
      </Typography>
      {trend && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {trend}
        </Typography>
      )}
    </CardContent>
  </Card>
);

// Certificate Preview Dialog
const CertificatePreviewDialog = ({ certificate, open, onClose, onDownload }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share certificate:', certificate?.id);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Certificate Preview
        <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
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
        </Box>
      </DialogTitle>
      <DialogContent>
        {certificate && (
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              {certificate.certificateName}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Issuer</Typography>
                <Typography>{certificate.issuer}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2">Date</Typography>
                <Typography>
                  {new Date(certificate.date).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Status</Typography>
                <Chip
                  label={certificate.authorized ? "Approved" : "Pending"}
                  color={certificate.authorized ? "success" : "warning"}
                />
              </Grid>
              {certificate.description && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Description</Typography>
                  <Typography>{certificate.description}</Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {certificate?.authorized && (
          <Button 
            startIcon={<DownloadIcon />}
            onClick={() => onDownload(certificate)}
          >
            Download
          </Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};


  // ... continuing from previous part

const UserDashboard = ({ updateNavButtons }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    fetchCertificates();
    setupNavigation();
  }, []);

  const setupNavigation = () => {
    if (typeof updateNavButtons === 'function') {
      const buttons = [
        <Button
          key="request-cert"
          color="inherit"
          onClick={() => navigate('/user/request')}
          startIcon={<AddIcon />}
        >
          Request Certificate
        </Button>
      ];
      updateNavButtons(buttons);
    }
  };

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await getAll();
      setCertificates(response);
    } catch (err) {
      setError('Failed to load certificates. Please try again.');
      showNotification('Error loading certificates', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certificate) => {
    try {
      await downloadCertificate(certificate.id);
      showNotification('Certificate downloaded successfully', 'success');
    } catch (err) {
      showNotification('Failed to download certificate', 'error');
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ open: true, message, type });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  const filteredCertificates = certificates.filter(cert =>
    cert.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCertificates = certificates.length;
  const approvedCertificates = certificates.filter(cert => cert.authorized).length;
  const pendingCertificates = totalCertificates - approvedCertificates;

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress />
        <Typography align="center" sx={{ mt: 2 }}>
          Loading your certificates...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Paper sx={{ p: 3, textAlign: 'center', mt: 4 }}>
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
          <Button 
            onClick={fetchCertificates}
            variant="contained"
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {localStorage.getItem('userName')}
        </Typography>
        <Typography color="textSecondary">
          Manage your certificates and requests
        </Typography>
      </Box>

      {/* Statistics Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatsCard
            icon={AssessmentIcon}
            title="Total Certificates"
            value={totalCertificates}
            color="primary.main"
            trend={`${totalCertificates} total certificates`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            icon={ApprovedIcon}
            title="Approved"
            value={approvedCertificates}
            color="success.main"
            trend={`${approvedCertificates} approved certificates`}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            icon={PendingIcon}
            title="Pending"
            value={pendingCertificates}
            color="warning.main"
            trend={`${pendingCertificates} pending requests`}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Certificates
            </Typography>
            <LineChart data={certificates} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Certificate Status
            </Typography>
            <PieChart data={certificates} />
          </Paper>
        </Grid>
      </Grid>

      {/* Search Section */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search certificates by name or issuer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Paper>

      {/* Certificates Grid */}
      <Grid container spacing={3}>
        {filteredCertificates.map((certificate) => (
          <Grid item xs={12} sm={6} md={4} key={certificate.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" gutterBottom>
                    {certificate.certificateName}
                  </Typography>
                  <Chip
                    label={certificate.authorized ? "Approved" : "Pending"}
                    color={certificate.authorized ? "success" : "warning"}
                    size="small"
                  />
                </Box>
                
                <Typography color="textSecondary" gutterBottom>
                  {certificate.issuer}
                </Typography>
                
                <Divider sx={{ my: 1.5 }} />
                
                <Typography variant="body2" color="textSecondary">
                  Issued: {new Date(certificate.date).toLocaleDateString()}
                </Typography>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Tooltip title="View Details">
                    <IconButton 
                      onClick={() => {
                        setSelectedCertificate(certificate);
                        setPreviewOpen(true);
                      }}
                      size="small"
                      color="primary"
                    >
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  {certificate.authorized && (
                    <Tooltip title="Download Certificate">
                      <IconButton 
                        onClick={() => handleDownload(certificate)}
                        size="small"
                        color="secondary"
                      >
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        
        {filteredCertificates.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="textSecondary" gutterBottom>
                No certificates found. Try adjusting your search or request a new certificate.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/user/request')}
                sx={{ mt: 2 }}
              >
                Request Certificate
              </Button>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Certificate Preview Dialog */}
      <CertificatePreviewDialog
        certificate={selectedCertificate}
        open={previewOpen}
        onClose={() => {
          setPreviewOpen(false);
          setSelectedCertificate(null);
        }}
        onDownload={handleDownload}
      />

      {/* Notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserDashboard;