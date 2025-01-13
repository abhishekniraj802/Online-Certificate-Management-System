// import React, { useState } from "react";
// import {  Button, Modal, Box, Typography, TextField, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { addUser } from "../../service";

// const CreateUserModal = ({ open, handleClose }) => {
//   const [userCredentials, setUserCredentials] = useState({
//     username: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar
//   const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State for Snackbar severity
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserCredentials({
//       ...userCredentials,
//       [name]: value,
//     });
//   };

//   const validate = () => {
//     let tempErrors = {};
//     const whitespacePattern = /^\s*$/;

//     if (!userCredentials.username || whitespacePattern.test(userCredentials.username)) {
//       tempErrors.username = "Username is required and cannot be blank.";
//     } else if (userCredentials.username.length < 3) {
//       tempErrors.username = "Username must be at least 3 characters long.";
//     }

//     if (!userCredentials.password || whitespacePattern.test(userCredentials.password)) {
//       tempErrors.password = "Password is required and cannot be blank.";
//     } else if (userCredentials.password.length < 6) {
//       tempErrors.password = "Password must be at least 6 characters long.";
//     }

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (validate()) {
//       console.log("User Credentials:", userCredentials);
//       try {
//         await addUser(userCredentials);
//         setSnackbarMessage("User created successfully!");
//         setSnackbarSeverity("success");
//         setOpenSnackbar(true); // Show success message
//         navigate("/view-all");
//       } catch (error) {
//         console.error("Error adding user:", error);
//         setSnackbarMessage(error.response?.data || "Error creating user.");
//         setSnackbarSeverity("error");
//         setOpenSnackbar(true); // Show error message
//       }
//       handleClose();
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <>
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             border: "2px solid #000",
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography variant="h6" component="h2">
//             Create User
//           </Typography>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Username"
//             variant="outlined"
//             name="username"
//             value={userCredentials.username}
//             onChange={handleChange}
//             error={!!errors.username}
//             helperText={errors.username}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Password"
//             type="password"
//             variant="outlined"
//             name="password"
//             value={userCredentials.password}
//             onChange={handleChange}
//             error={!!errors.password}
//             helperText={errors.password}
//           />
//           <Button
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 2 }}
//             onClick={handleSubmit}
//           >
//             Create User
//           </Button>
//         </Box>
//       </Modal>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={3000} // Auto close after 3 seconds
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position top-right
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export { CreateUserModal };

import React, { useState } from "react";
import { Button, Modal, Box, Typography, TextField, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../service";

const CreateUserModal = ({ open, handleClose }) => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    const whitespacePattern = /^\s*$/;

    if (!userCredentials.username || whitespacePattern.test(userCredentials.username)) {
      tempErrors.username = "Username is required and cannot be blank.";
    } else if (userCredentials.username.length < 3) {
      tempErrors.username = "Username must be at least 3 characters long.";
    }

    if (!userCredentials.password || whitespacePattern.test(userCredentials.password)) {
      tempErrors.password = "Password is required and cannot be blank.";
    } else if (userCredentials.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        await addUser(userCredentials);
        setSnackbarMessage("User created successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        navigate("/view-all");
      } catch (error) {
        console.error("Error adding user:", error);
        setSnackbarMessage(error.response?.data || "Error creating user.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
      handleClose();
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Create User
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            name="username"
            value={userCredentials.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={userCredentials.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export { CreateUserModal };