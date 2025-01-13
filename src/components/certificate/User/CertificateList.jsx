// CertificateTable.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Box,
  Chip,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Share as ShareIcon,
  Visibility as VisibilityIcon,
  GridView as GridViewIcon,
  List as ListViewIcon,
  Sort as SortIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { getAll } from "../../service";
import { useNavigate } from "react-router-dom";

const CertificateCard = ({ certificate, onDownload }) => (
  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" gutterBottom>
        {certificate.certificateName}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {certificate.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Issuer: {certificate.issuer}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Date: {new Date(certificate.date).toLocaleDateString()}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Chip
          label={certificate.authorized ? "Approved" : "Pending"}
          color={certificate.authorized ? "success" : "warning"}
          size="small"
        />
      </Box>
    </CardContent>
    <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
      <Tooltip title="View Details">
        <IconButton size="small">
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      {certificate.authorized && (
        <Tooltip title="Download Certificate">
          <IconButton 
            size="small" 
            onClick={() => onDownload(certificate.pdfContent, `${certificate.name}.pdf`)}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Share">
        <IconButton size="small">
          <ShareIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Card>
);

const CertificateTable = ({ updateNavButtons }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const navigate = useNavigate();

  useEffect(() => {
    const buttons = [
      <Button
        onClick={() => navigate("/")}
        variant="contained"
        color="secondary"
      >
        Add Certificate
      </Button>,
      <Button
        onClick={handleLogout}
        variant="contained"
        color="secondary"
      >
        Logout
      </Button>,
    ];
    updateNavButtons(buttons);
  }, [navigate, updateNavButtons]);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await getAll();
      setCertificates(response);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (base64String, fileName) => {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (sortType) => {
    setSortAnchorEl(null);
    if (typeof sortType === 'string') {
      setSortBy(sortType);
    }
  };

  const filteredAndSortedCertificates = certificates
    .filter(cert => 
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'status':
          return b.authorized - a.authorized;
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Certificates
        </Typography>
        
        {/* Controls */}
        <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newValue) => newValue && setViewMode(newValue)}
                size="small"
              >
                <ToggleButton value="grid">
                  <GridViewIcon />
                </ToggleButton>
                <ToggleButton value="list">
                  <ListViewIcon />
                </ToggleButton>
              </ToggleButtonGroup>
              
              <Button
                startIcon={<SortIcon />}
                onClick={handleSortClick}
                variant="outlined"
              >
                Sort
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={() => handleSortClose()}
              >
                <MenuItem onClick={() => handleSortClose('date')}>Date</MenuItem>
                <MenuItem onClick={() => handleSortClose('name')}>Name</MenuItem>
                <MenuItem onClick={() => handleSortClose('status')}>Status</MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Certificates Grid/List */}
      <Grid container spacing={3}>
        {filteredAndSortedCertificates.map((certificate) => (
          <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} md={viewMode === 'grid' ? 4 : 12} key={certificate.id}>
            <CertificateCard
              certificate={certificate}
              onDownload={handleDownload}
            />
          </Grid>
        ))}
      </Grid>

      {filteredAndSortedCertificates.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography color="textSecondary">
            No certificates found. Try adjusting your search or add a new certificate.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CertificateTable;