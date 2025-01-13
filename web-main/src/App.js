// // src/App.js
// import React, {  useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import Login from './components/certificate/Auth/Login';
// // import CertificateDetail from './components/CertificateDetail';
// import CertificateList from './components/certificate/User/CertificateList';
// import AddCertificate from './components/certificate/User/AddCertificate';
// import "./App.css";
// import { ListAllUser } from './components/certificate/Admin/ListAllCertificates';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { Grid } from '@mui/material';
// import AdminPanel from './components/certificate/Admin/AdminPanel';

// // Utility function to check token validity
// const isTokenValid = (token) => {
//   if (!token) return false;

//   try {
//     const decoded = jwtDecode(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp > currentTime;
//   } catch (error) {
//     return false;
//   }
// };

// const PrivateRoute = ({ children  , updateNavButtons}) => {
//   const token = localStorage.getItem('token');
//   if (isTokenValid(token)) {
//     return children;
//   } else {
//     localStorage.removeItem('token');
//     updateNavButtons([]);  // Reset the navbar buttons
//     return <Navigate to="/login" />;
//   }
// };
// const PrivateRouteAdmin = ({ children , updateNavButtons}) => {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');
//   if (isTokenValid(token) && role === "ADMIN") {
//     return children;
//   } else {
//     localStorage.removeItem('token');
//     updateNavButtons([]);  // Reset the navbar buttons
//     return <Navigate to="/login" />;
//   }
// };

// function App() {
//   const [navButtons, setNavButtons] = useState([]);
//   const updateNavButtons = (buttons) => {
//     debugger
//     setNavButtons(buttons);
//   };
//   function AppNavBar({ buttons }) {
//     return (
//       <AppBar position="sticky" style={{ zIndex: 1 }}>
//         <Toolbar  >
//           <Grid container spacing={0}>
//             <Grid item xs={10}>
//               <Typography style={{ fontFamily: "monospace" }} variant="h4" component="div" sx={{ flexGrow: 1 }}>
//                 OCMS
//               </Typography>
//             </Grid>
//             <Grid item xs={2} >
//               <Grid container spacing={0}>
//                 {buttons && buttons.map((ButtonComponent, index) => (
//                   <Grid item xs={6}>
//                     <Box key={index} sx={{ ml: 2 }}>
//                       {ButtonComponent}
//                     </Box>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>

//           </Grid>
//         </Toolbar>
//       </AppBar>
//     );
//   }
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppNavBar buttons={navButtons} />
//       <Router>
//         <Routes>
//           <Route updateNavButtons={updateNavButtons} path="/login" element={<Login  updateNavButtons={updateNavButtons} />} />
//           <Route
//             path="/list"
//             element={
//               <PrivateRoute updateNavButtons={updateNavButtons}>
//                 <CertificateList updateNavButtons={updateNavButtons} />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/view-all"
//             element={
//               <PrivateRouteAdmin updateNavButtons={updateNavButtons}>
//                 <AdminPanel updateNavButtons={updateNavButtons} />
//               </PrivateRouteAdmin>
//             }
//           />
//           <Route
//             path="/"
//             element={
//               <PrivateRoute updateNavButtons={updateNavButtons}>
//                 <AddCertificate updateNavButtons={updateNavButtons} />
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </Router>
//     </Box>
//   );
// }

// export default App;

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Box, Container } from '@mui/material';

// Component Imports
import Login from './components/certificate/Auth/Login';
import UserDashboard from './components/certificate/User/UserDashboard';
import AdminPanel from './components/certificate/Admin/AdminPanel';
import CertificateList from './components/certificate/User/CertificateList';
import AddCertificate from './components/certificate/User/AddCertificate';
import { ListAllCertificates } from './components/certificate/Admin/ListAllCertificates';
import { AllUsers } from './components/certificate/Admin/AllUsers';
import Navbar from './components/shared/Layout/Navbar';
import Footer from './components/shared/Layout/Footer';
import LandingPage from './components/LandingPage'; 

// Token validation utility
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

// Protected Route Components
const PrivateRoute = ({ children, updateNavButtons }) => {
  const token = localStorage.getItem('token');

  if (!isTokenValid(token)) {
    localStorage.clear();
    updateNavButtons([]);
    return <Navigate to="/login" />;
  }

  return React.cloneElement(children, { updateNavButtons });
};

const AdminRoute = ({ children, updateNavButtons }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!isTokenValid(token) || role !== 'ADMIN') {
    localStorage.clear();
    updateNavButtons([]);
    return <Navigate to="/login" />;
  }

  return React.cloneElement(children, { updateNavButtons });
};

function App() {
  const [navButtons, setNavButtons] = useState([]);
  const [userName, setUserName] = useState(''); // Initialize userName state
  const [certificates, setCertificates] = useState([]); // Initialize certificates state

  const updateNavButtons = (buttons) => {
    setNavButtons(buttons || []);
  };

  const handleLogin = (name, userCertificates) => {
    setUserName(name); // Set the user's name
    setCertificates(userCertificates); // Set the user's certificates
  };

  const handleLogout = () => {
    localStorage.clear();
    updateNavButtons([]);
    setUserName(''); // Clear userName on logout
    setCertificates([]); // Clear certificates on logout
    window.location.href = '/login';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Router>
        <Navbar onLogout={handleLogout} navButtons={navButtons} />
        <Container sx={{ flex: 1, py: 3 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage userName={userName} certificates={certificates} />} />

            <Route 
              path="/login" 
              element={<Login updateNavButtons={updateNavButtons} onLogin={handleLogin} />} 
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute updateNavButtons={updateNavButtons}>
                  <AdminPanel />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/certificates"
              element={
                <AdminRoute updateNavButtons={updateNavButtons}>
                  <ListAllCertificates />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute updateNavButtons={updateNavButtons}>
                  <AllUsers />
                </AdminRoute>
              }
            />

            {/* User Routes */}
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute updateNavButtons={updateNavButtons}>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/certificates"
              element={
                <PrivateRoute updateNavButtons={updateNavButtons}>
                  <CertificateList />
                </PrivateRoute>
              }
            />
            <Route
              path="/user/request"
              element={
                <PrivateRoute updateNavButtons={updateNavButtons}>
                  <AddCertificate />
                </PrivateRoute>
              }
            />

            {/* Default Route */}
            <Route 
              path="/" 
              element={
                <PrivateRoute updateNavButtons={updateNavButtons}>
                  {localStorage.getItem('role') === 'ADMIN' ? 
                    <Navigate to="/admin/dashboard" /> : 
                    <Navigate to="/user/dashboard" />
                  }
                </PrivateRoute>
              } 
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
        <Footer /> {/* Add the Footer component here */}
      </Router>
    </Box>
  );
}

export default App;