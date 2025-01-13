// // AdminPanel.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Paper,
//   TextField,
//   InputAdornment,
//   Tab,
//   Tabs,
//   useTheme,
// } from '@mui/material';
// import {
//   PendingActions,
//   People,
//   Assignment,
//   Search,
//   CalendarToday,
// } from '@mui/icons-material';
// import { getAllCertificates, getAllUser } from '../../service';
// import { ListAllCertificates } from './ListAllCertificates';
// import { AllUsers } from './AllUsers';
// import { LineChart, PieChart } from '../Common/Charts';

// const StatCard = ({ title, value, icon, color }) => (
//   <Card sx={{ height: '100%' }}>
//     <CardContent>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Typography color="textSecondary" gutterBottom variant="overline">
//             {title}
//           </Typography>
//           <Typography variant="h4" color="textPrimary">
//             {value}
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             backgroundColor: color,
//             borderRadius: 2,
//             p: 1,
//             display: 'flex',
//             alignItems: 'center',
//           }}
//         >
//           {icon}
//         </Box>
//       </Box>
//     </CardContent>
//   </Card>
// );

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// const AdminPanel = ({ updateNavButtons }) => {
//   const [statistics, setStatistics] = useState({
//     pendingApprovals: 0,
//     activeUsers: 0,
//     totalCertificates: 0,
//     monthlyIssued: 0,
//   });
//   const [certificates, setCertificates] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [value, setValue] = useState(0);
//   const theme = useTheme();

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [certificatesData, usersData] = await Promise.all([
//         getAllCertificates(),
//         getAllUser(),
//       ]);

//       setCertificates(certificatesData || []);
//       setUsers(usersData || []);

//       // Calculate statistics
//       const pending = certificatesData ? certificatesData.filter(cert => !cert.authorized).length : 0;
//       const monthly = certificatesData ? certificatesData.filter(cert => {
//         const certDate = new Date(cert.date);
//         const currentDate = new Date();
//         return certDate.getMonth() === currentDate.getMonth() &&
//                certDate.getFullYear() === currentDate.getFullYear();
//       }).length : 0;

//       setStatistics({
//         pendingApprovals: pending,
//         activeUsers: usersData ? usersData.length : 0,
//         totalCertificates: certificatesData ? certificatesData.length : 0,
//         monthlyIssued: monthly,
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Statistics Cards */}
//       <Grid container spacing={3} mb={3}>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Pending Approvals"
//             value={statistics.pendingApprovals}
//             icon={<PendingActions sx={{ color: 'white' }} />}
//             color={theme.palette.warning.main}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Active Users"
//             value={statistics.activeUsers}
//             icon={<People sx={{ color: 'white' }} />}
//             color={theme.palette.primary.main}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Total Certificates"
//             value={statistics.totalCertificates}
//             icon={<Assignment sx={{ color: 'white' }} />}
//             color={theme.palette.success.main}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="Issued This Month"
//             value={statistics.monthlyIssued}
//             icon={<CalendarToday sx={{ color: 'white' }} />}
//             color={theme.palette.info.main}
//           />
//         </Grid>
//       </Grid>

//       {/* Charts Section */}
//       <Grid container spacing={3} mb={3}>
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Certificate Issuance Trend
//             </Typography>
//             <LineChart data={certificates} />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Certificate Status Distribution
//             </Typography>
//             <PieChart data={certificates} />
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Tabs and Search */}
//       <Paper sx={{ width: '100%' }}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
//           <Grid container alignItems="center" spacing={2}>
//             <Grid item xs>
//               <Tabs value={value} onChange={handleChange}>
//                 <Tab label="All Certificates" />
//                 <Tab label="All Users" />
//               </Tabs>
//             </Grid>
//             <Grid item>
//               <TextField
//                 size="small"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Search />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//           </Grid>
//         </Box>

//         <CustomTabPanel value={value} index={0}>
//           <ListAllCertificates 
//             updateNavButtons={updateNavButtons}
//             searchTerm={searchTerm}
//             onUpdate={fetchData}
//           />
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           <AllUsers 
//             updateNavButtons={updateNavButtons}
//             searchTerm={searchTerm}
//             onUpdate={fetchData}
//           />
//         </CustomTabPanel>
//       </Paper>
//     </Box>
//   );
// };

// export default AdminPanel;



import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import {
  PendingActions,
  People,
  Assignment,
  Search,
  CalendarToday,
} from '@mui/icons-material';
import { getAllCertificates, getAllUser } from '../../service';
import { ListAllCertificates } from './ListAllCertificates';
import { AllUsers } from './AllUsers';
import { LineChart, PieChart } from '../Common/Charts';

// Component for displaying statistics in card format
const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4" color="textPrimary">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: 2,
            p: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Custom tab panel component
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Main Admin Panel component
const AdminPanel = ({ updateNavButtons }) => {
  const [statistics, setStatistics] = useState({
    pendingApprovals: 0,
    activeUsers: 0,
    totalCertificates: 0,
    monthlyIssued: 0,
  });
  const [certificates, setCertificates] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [value, setValue] = useState(0);
  const theme = useTheme();

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch certificates and users data
  const fetchData = async () => {
    try {
      const [certificatesData, usersData] = await Promise.all([
        getAllCertificates(),
        getAllUser(),
      ]);

      setCertificates(certificatesData || []);
      setUsers(usersData || []);

      // Calculate statistics
      const pending = certificatesData ? certificatesData.filter(cert => !cert.authorized).length : 0;
      const monthly = certificatesData ? certificatesData.filter(cert => {
        const certDate = new Date(cert.date);
        const currentDate = new Date();
        return certDate.getMonth() === currentDate.getMonth() &&
               certDate.getFullYear() === currentDate.getFullYear();
      }).length : 0;

      setStatistics({
        pendingApprovals: pending,
        activeUsers: usersData ? usersData.length : 0,
        totalCertificates: certificatesData ? certificatesData.length : 0,
        monthlyIssued: monthly,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Approvals"
            value={statistics.pendingApprovals}
            icon={<PendingActions sx={{ color: 'white' }} />}
            color={theme.palette.warning.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={statistics.activeUsers}
            icon={<People sx={{ color: 'white' }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Certificates"
            value={statistics.totalCertificates}
            icon={<Assignment sx={{ color: 'white' }} />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Issued This Month"
            value={statistics.monthlyIssued}
            icon={<CalendarToday sx={{ color: 'white' }} />}
            color={theme.palette.info.main}
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Certificate Issuance Trend
            </Typography>
            <LineChart data={certificates} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Certificate Status Distribution
            </Typography>
            <PieChart data={certificates} />
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs and Search */}
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs>
              <Tabs value={value} onChange={handleChange}>
                <Tab label="All Certificates" />
                <Tab label="All Users" />
              </Tabs>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <ListAllCertificates 
            updateNavButtons={updateNavButtons}
            searchTerm={searchTerm}
            onUpdate={fetchData}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AllUsers 
            updateNavButtons={updateNavButtons}
            searchTerm={searchTerm}
            onUpdate={fetchData}
          />
        </CustomTabPanel>
      </Paper>
    </Box>
  );
};

export default AdminPanel;