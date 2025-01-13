// // web/src/components/LandingPage.jsx
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, Button, Grid, Container, Fade, CircularProgress } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { CheckCircle, Security, Update } from '@mui/icons-material';

// const LandingPage = ({ userName, certificates }) => {
//   const [loading, setLoading] = useState(true);
//   const [displayedCertificates, setDisplayedCertificates] = useState([]);

//   useEffect(() => {
//     // Simulate fetching certificates with a delay
//     const fetchCertificates = () => {
//       // If certificates are passed as props, use them directly
//       if (certificates && certificates.length > 0) {
//         setDisplayedCertificates(certificates);
//       } else {
//         // Simulate an API call or fetching logic
//         setTimeout(() => {
//           // Example: Simulated fetched data
//           const fetchedCertificates = [
//             { title: 'Certificate 1', description: 'Description for Certificate 1' },
//             { title: 'Certificate 2', description: 'Description for Certificate 2' },
//           ];
//           setDisplayedCertificates(fetchedCertificates);
//         }, 1000); // Simulate a 1-second fetch delay
//       }
//       setLoading(false);
//     };

//     fetchCertificates();
//   }, [certificates]);

//   return (
//     <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
//       {/* Header Section */}
//       <Box sx={{ bgcolor: 'rgba(0, 0, 0, 0.8)', color: 'white', p: 4, textAlign: 'center' }}>
//         <Typography variant="h2" gutterBottom>
//           Welcome to the Online Certificate Management System
//         </Typography>
//         <Typography variant="h5" gutterBottom>
//           {userName ? `Hello, ${userName}!` : 'Streamline your academic certificate management with ease.'}
//         </Typography>
//         <Button variant="contained" color="success" component={Link} to="/login" sx={{ mt: 2 }}>
//           Get Started
//         </Button>
//       </Box>

//       {/* Features Section */}
//       <Container sx={{ py: 5 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Features
//         </Typography>
//         <Grid container spacing={4}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Fade in timeout={1600}>
//               <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
//                 <CheckCircle color="success" fontSize="large" />
//                 <Typography variant="h6">User-Friendly Interface</Typography>
//                 <Typography>
//                   Our platform is designed with simplicity in mind, making it easy for students and administrators to navigate.
//                 </Typography>
//                 <Button variant="outlined" component={Link} to="/login" sx={{ mt: 2 }}>
//                   Login to Explore
//                 </Button>
//               </Box>
//             </Fade>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Fade in timeout={1800}>
//               <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
//                 <Security color="primary" fontSize="large" />
//                 <Typography variant="h6">Secure Authentication</Typography>
//                 <Typography>
//                   We prioritize your security with robust authentication methods to protect your data.
//                 </Typography>
//                 <Button variant="outlined" component={Link} to="/login" sx={{ mt: 2 }}>
//                   Login to Secure Access
//                 </Button>
//               </Box>
//             </Fade>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Fade in timeout={2000}>
//               <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
//                 <Update color="action" fontSize="large" />
//                 <Typography variant="h6">Real-Time Updates</Typography>
//                 <Typography>
//                   Stay informed with real-time updates on your certificate requests and approvals.
//                 </Typography>
//                 <Button variant="outlined" component={Link} to="/login" sx={{ mt: 2 }}>
//                   Login for Updates
//                 </Button>
//               </Box>
//             </Fade>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Certificates Section */}
//       <Container sx={{ py: 5 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Your Certificates
//         </Typography>
//         {loading ? (
//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Grid container spacing={4}>
//             {displayedCertificates.length > 0 ? (
//               displayedCertificates.map((certificate, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={index}>
//                   <Fade in timeout={index * 300 + 500}>
//                     <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2, textAlign: 'center', boxShadow: 3 }}>
//                       <Typography variant="h6">{certificate.title}</Typography>
//                       <Typography>{certificate.description}</Typography>
//                     </Box>
//                   </Fade>
//                 </Grid>
//               ))
//             ) : (
//               <Typography align="center">No certificates found.</Typography>
//             )}
//           </Grid>
//         )}
//       </Container>

//       {/* Call to Action Section */}
//       <Box sx={{ bgcolor: '#28a745', color: 'white', p: 4, textAlign: 'center' }}>
//         <Typography variant="h5" gutterBottom>
//           Ready to manage your certificates efficiently?
//         </Typography>
//         <Button variant="contained" color="inherit" component={Link} to="/login">
//           Sign In Now
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default LandingPage;


import React, { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia, Divider, Fab, IconButton, CircularProgress, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Security, GitHub, Email } from '@mui/icons-material';
import { keyframes } from '@emotion/react';

// Keyframe for animation effect on the cards
const cardHoverAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.05);
  }
`;

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth logic
  const navigate = useNavigate();

  const handleViewRequestsClick = () => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      // Handle view requests if logged in
      console.log('View Requests Clicked');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container sx={{ py: 5 }}>
        {/* Section 1: Project Overview */}
        <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333', letterSpacing: '2px' }}>
          Online Certificate Management System
        </Typography>
        <Typography variant="subtitle1" align="center" sx={{ color: '#777', mb: 2, fontSize: '1.2rem' }}>
          A simple and efficient way to manage certificates with both admin and user functionalities.
        </Typography>
        <Divider sx={{ my: 4, '&::before, &::after': { borderColor: '#28a745' } }} />
        
        <Typography variant="h4" gutterBottom sx={{ color: '#28a745' }}>
          Objective & Tech Stack
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Frontend:</strong> React, Material UI, Axios for HTTP requests
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Backend:</strong> Spring Boot, MySQL (Monolithic approach)
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          <strong>Deployed on:</strong> <a href="https://web-xi-orcin.vercel.app/" target="_blank" rel="noopener noreferrer">Vercel</a>
        </Typography>

        {/* Section 2: Features */}
        <Typography variant="h4" gutterBottom sx={{ color: '#28a745' }}>
          Key Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {/* Admin Features */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              elevation={6} 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                transition: 'transform 0.3s ease-in-out', 
                '&:hover': { 
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
                }
              }}
            >
              <CardMedia>
                <CheckCircle color="success" fontSize="large" sx={{ mb: 2 }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Admin Features</Typography>
                <ul>
                  <li>View all pending requests and active users</li>
                  <li>Create users and change passwords</li>
                  <li>Search certificates by ID, name, or user ID</li>
                  <li>Download and authorize/deauthorize user certificate requests</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
          
          {/* User Features */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              elevation={6} 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                transition: 'transform 0.3s ease-in-out', 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
                }
              }}
            >
              <CardMedia>
                <Security color="primary" fontSize="large" sx={{ mb: 2 }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>User Features</Typography>
                <ul>
                  <li>Login with provided credentials</li>
                  <li>Request certificates and view status</li>
                  <li>Download certificates after admin authorization</li>
                  <li>Check current status in analytics form</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          {/* Track Requests */}
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              elevation={6} 
              sx={{ 
                p: 3, 
                textAlign: 'center', 
                transition: 'transform 0.3s ease-in-out', 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
                }
              }}
            >
              <CardMedia>
                <CircularProgress color="secondary" size={60} sx={{ mb: 2 }} />
              </CardMedia>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>Track Requests</Typography>
                <Stack spacing={2}>
                  <Typography variant="body2" sx={{ color: 'gray' }}>Track the status of your certificate requests in real-time. if you are not logged in, you can view the requests by clicking on the view requests button after login.</Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleViewRequestsClick}
                  >
                    View Requests
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Section 3: Deployment and Credentials */}
        <Typography variant="h4" gutterBottom sx={{ color: '#28a745' }}>
          Credentials & Deployment Link
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Feel free to explore the live demo here: <a href="https://web-xi-orcin.vercel.app/" target="_blank" rel="noopener noreferrer">Online Certificate Management System</a>
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Admin Credentials:</strong> Username: admin, Password: admin
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          <strong>User Credentials:</strong> Username: alok, Password: Alok@123
        </Typography>

        {/* Section 4: Git Repository & Open Request for Help */}
        <Typography variant="h4" gutterBottom sx={{ color: '#28a745' }}>
          Git Repository
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Check out the project on GitHub: <a href="https://github.com/alokgarg003/" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ color: '#28a745' }}>
          Need Help or Guidance?
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          If you have any project requirements, or if you’re working on a similar stack, feel free to reach out! I'm available to help for free during weekends (Saturday/Sunday).
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Email />}
          component="a"
          href="mailto:alokgarg003@gmail.com"
          sx={{
            '&:hover': {
              backgroundColor: '#0056b3',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease-in-out',
            },
          }}
        >
          Get in Touch
        </Button>

        {/* Floating Action Buttons for Contact and GitHub */}
        <Fab color="secondary" aria-label="contact" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
          <Email />
        </Fab>

        <IconButton
          component="a"
          href="https://github.com/alokgarg003/web"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          sx={{ position: 'fixed', top: 16, right: 16 }}
        >
          <GitHub fontSize="large" />
        </IconButton>
      </Container>
    </Box>
  );
};

export default LandingPage;
