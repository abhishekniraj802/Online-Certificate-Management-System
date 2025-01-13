// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Typography,
//   Container,
//   Box,
//   IconButton,
//   Chip,
//   TextField,
//   InputAdornment,
//   Card,
//   CardContent,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
// } from "@mui/material";
// import {
//   Download as DownloadIcon,
//   Search as SearchIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   Refresh as RefreshIcon,
//   PersonAdd as PersonAddIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { CreateUserModal } from "./CreateUserModal";
// import { authorizeCertificatebyId, deauthorizeCertificatebyId, getAllCertificates } from "../../service";

// const ListAllCertificates = ({ updateNavButtons }) => {
//   const [certificates, setCertificates] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null, action: null });
//   const navigate = useNavigate();

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   useEffect(() => {
//     const buttons = [
//       <Button
//         onClick={handleOpen}
//         color="secondary"
//         variant="contained"
//         startIcon={<PersonAddIcon />}
//         sx={{ borderRadius: 2 }}
//       >
//         Create User
//       </Button>,
//       <Button
//         onClick={handleLogout}
//         color="secondary"
//         variant="contained"
//         startIcon={<LogoutIcon />}
//         sx={{ borderRadius: 2 }}
//       >
//         Logout
//       </Button>,
//     ];
//     updateNavButtons(buttons);
//   }, []);

//   const fetchCertificates = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllCertificates();
//       setCertificates(response);
//     } catch (error) {
//       console.error("Error fetching certificates:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCertificates();
//   }, []);

//   const handleDownload = (base64String, fileName) => {
//     const byteCharacters = atob(base64String);
//     const byteArray = new Uint8Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteArray[i] = byteCharacters.charCodeAt(i);
//     }
//     const blob = new Blob([byteArray], { type: "application/pdf" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const handleAuthorize = async (id) => {
//     setConfirmDialog({ open: false, id: null, action: null });
//     try {
//       const response = await authorizeCertificatebyId(id);
//       if (response === "Ok") {
//         fetchCertificates();
//       }
//     } catch (error) {
//       console.error("Error Authorizing certificate:", error);
//     }
//   };

//   const handleDeauthorize = async (id) => {
//     setConfirmDialog({ open: false, id: null, action: null });
//     try {
//       const response = await deauthorizeCertificatebyId(id);
//       if (response === "Ok") {
//         fetchCertificates();
//       }
//     } catch (error) {
//       console.error("Error Deauthorizing certificate:", error);
//     }
//   };

//   const filteredCertificates = certificates.filter(
//     (cert) =>
//       cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       cert.certificateName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Container maxWidth="xl" sx={{ py: 4 }}>
//       <Card sx={{ mb: 4, borderRadius: 2 }}>
//         <CardContent>
//           <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//             <Typography variant="h4" component="h1" fontWeight="bold">
//               Certificate Management
//             </Typography>
//             <IconButton onClick={fetchCertificates} color="primary">
//               <RefreshIcon />
//             </IconButton>
//           </Box>

//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search certificates..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             sx={{ mb: 3 }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//             <Table sx={{ minWidth: 650 }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Issuer</TableCell>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Certificate Name</TableCell>
//                   <TableCell>User ID</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredCertificates.map((cert) => (
//                   <TableRow key={cert.id} hover>
//                     <TableCell>{cert.name}</TableCell>
//                     <TableCell>{cert.issuer}</TableCell>
//                     <TableCell>{new Date(cert.date).toLocaleDateString()}</TableCell>
//                     <TableCell>{cert.certificateName}</TableCell>
//                     <TableCell>{cert.userId}</TableCell>
//                     <TableCell>
//                       <Chip
//                         label={cert.authorized ? "Authorized" : "Pending"}
//                         color={cert.authorized ? "success" : "warning"}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Box display="flex" justifyContent="center" gap={1}>
//                         {cert.authorized && (
//                           <Tooltip title="Download Certificate">
//                             <IconButton
//                               color="primary"
//                               onClick={() => handleDownload(cert.pdfContent, `${cert.name}.pdf`)}
//                             >
//                               <DownloadIcon />
//                             </IconButton>
//                           </Tooltip>
//                         )}
//                         <Tooltip title={cert.authorized ? "Revoke Authorization" : "Authorize"}>
//                           <IconButton
//                             color={cert.authorized ? "error" : "success"}
//                             onClick={() =>
//                               setConfirmDialog({
//                                 open: true,
//                                 id: cert.id,
//                                 action: cert.authorized ? "deauthorize" : "authorize",
//                               })
//                             }
//                           >
//                             {cert.authorized ? <CancelIcon /> : <CheckCircleIcon />}
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>

//       <CreateUserModal open={open} handleClose={handleClose} />

//       {/* Confirmation Dialog */}
//       <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null })}>
//         <DialogTitle>Confirm Action</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to {confirmDialog.action === "authorize" ? "authorize" : "revoke"}{" "}
//             this certificate?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmDialog({ open: false, id: null })}>Cancel</Button>
//           <Button
//             onClick={() =>
//               confirmDialog.action === "authorize"
//                 ? handleAuthorize(confirmDialog.id)
//                 : handleDeauthorize(confirmDialog.id)
//             }
//             color={confirmDialog.action === "authorize" ? "success" : "error"}
//             variant="contained"
//           >
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export { ListAllCertificates };


import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Container,
  Box,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Refresh as RefreshIcon,
  PersonAdd as PersonAddIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { CreateUserModal } from "./CreateUserModal";
import { authorizeCertificatebyId, deauthorizeCertificatebyId, getAllCertificates } from "../../service";

const ListAllCertificates = ({ updateNavButtons }) => {
  const [certificates, setCertificates] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null, action: null });
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const buttons = [
      <Button
        onClick={handleOpen}
        color="secondary"
        variant="contained"
        startIcon={<PersonAddIcon />}
        sx={{ borderRadius: 2 }}
      >
        Create User
      </Button>,
      <Button
        onClick={handleLogout}
        color="secondary"
        variant="contained"
        startIcon={<LogoutIcon />}
        sx={{ borderRadius: 2 }}
      >
        Logout
      </Button>,
    ];
    updateNavButtons(buttons);
  }, [updateNavButtons]);

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const response = await getAllCertificates();
      setCertificates(response);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDownload = (base64String, fileName) => {
    const byteCharacters = atob(base64String);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleAuthorize = async (id) => {
    setConfirmDialog({ open: false, id: null, action: null });
    try {
      const response = await authorizeCertificatebyId(id);
      if (response === "Ok") {
        fetchCertificates();
      }
    } catch (error) {
      console.error("Error Authorizing certificate:", error);
    }
  };

  const handleDeauthorize = async (id) => {
    setConfirmDialog({ open: false, id: null, action: null });
    try {
      const response = await deauthorizeCertificatebyId(id);
      if (response === "Ok") {
        fetchCertificates();
      }
    } catch (error) {
      console.error("Error Deauthorizing certificate:", error);
    }
  };

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Card sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Certificate Management
            </Typography>
            <IconButton onClick={fetchCertificates} color="primary">
              <RefreshIcon />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Issuer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Certificate Name</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCertificates.map((cert) => (
                  <TableRow key={cert.id} hover>
                    <TableCell>{cert.name}</TableCell>
                    <TableCell>{cert.issuer}</TableCell>
                    <TableCell>{new Date(cert.date).toLocaleDateString()}</TableCell>
                    <TableCell>{cert.certificateName}</TableCell>
                    <TableCell>{cert.userId}</TableCell>
                    <TableCell>
                      <Chip
                        label={cert.authorized ? "Authorized" : "Pending"}
                        color={cert.authorized ? "success" : "warning"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="center" gap={1}>
                        {cert.authorized && (
                          <Tooltip title="Download Certificate">
                            <IconButton
                              color="primary"
                              onClick={() => handleDownload(cert.pdfContent, `${cert.name}.pdf`)}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title={cert.authorized ? "Revoke Authorization" : "Authorize"}>
                          <IconButton
                            color={cert.authorized ? "error" : "success"}
                            onClick={() =>
                              setConfirmDialog({
                                open: true,
                                id: cert.id,
                                action: cert.authorized ? "deauthorize" : "authorize",
                              })
                            }
                          >
                            {cert.authorized ? <CancelIcon /> : <CheckCircleIcon />}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <CreateUserModal open={open} handleClose={handleClose} />

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null })}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {confirmDialog.action === "authorize" ? "authorize" : "revoke"}{" "}
            this certificate?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, id: null })}>Cancel</Button>
          <Button
            onClick={() =>
              confirmDialog.action === "authorize"
                ? handleAuthorize(confirmDialog.id)
                : handleDeauthorize(confirmDialog.id)
            }
            color={confirmDialog.action === "authorize" ? "success" : "error"}
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export { ListAllCertificates };