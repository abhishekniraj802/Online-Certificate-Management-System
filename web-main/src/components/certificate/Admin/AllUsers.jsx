import React, { useEffect, useState } from "react";
import { forgotPasswordApi, getAllUser } from "../../service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

const AllUsers = ({ updateNavButtons }) => {
  const [users, setUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        setUser(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
    updateNavButtons([]);
  }, [updateNavButtons]);

  const handleForgotPassword = (id) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
    setNewPassword("");
  };

  const handleConfirmForgotPassword = async () => {
    try {
      if (selectedUserId !== null && newPassword) {
        const payload = { id: selectedUserId, password: newPassword };
        await forgotPasswordApi(payload);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000); // Show success for 5 seconds
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleForgotPassword(user.id)}
                    color="success"
                    variant="contained"
                  >
                    Forgot Password
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Forgot Password Dialog with Password Input */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the new password for this user.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmForgotPassword}
            color="success"
            variant="contained"
            disabled={newPassword.trim().length <= 5}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={success} autoHideDuration={5000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Password reset successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export { AllUsers };