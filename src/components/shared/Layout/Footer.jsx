import React from 'react';
import { Box, Typography, Link, Grid, Divider } from '@mui/material';
import { Email as EmailIcon, Phone as PhoneIcon, LocationOn as LocationIcon } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper', // Use theme background color
        color: 'text.primary', // Ensures the text color is appropriate based on the theme
        p: { xs: 2, sm: 4 }, // Responsive padding for better spacing on mobile
        position: 'relative',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Alok Kumar Garg
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Analyst / A4 | Software Engineer
      </Typography>
      <Divider sx={{ my: 2, bgcolor: 'divider' }} />

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography>
            <EmailIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            <Link href="mailto:alok-kumar.garg@capgemini.com" color="inherit" underline="hover" aria-label="Email Alok Kumar Garg">
              alok-kumar.garg@capgemini.com
            </Link>
          </Typography>
          <Typography>
            <PhoneIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            <Link href="tel:+918306718442" color="inherit" underline="hover" aria-label="Call Alok Kumar Garg">
              8306718442
            </Link>
          </Typography>
          <Typography>
            <LocationIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Jamuna Das Wali Gali, Malak Para Bari Dholpur (328021)
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Projects
          </Typography>
          <Typography>
            <Link href="/turf-management-system" color="inherit" underline="hover" aria-label="Turf Management System">
              Turf Management System
            </Link> - A web application for managing sports turf bookings.
          </Typography>
          <Typography>
            <Link href="/online-certificate-management-system" color="inherit" underline="hover" aria-label="Online Certificate Management System">
              Online Certificate Management System
            </Link> - A platform for managing academic certificates.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          <Typography>Languages: Java, C++, JavaScript, HTML</Typography>
          <Typography>Frameworks: ReactJS, Spring Boot</Typography>
          <Typography>Database: MySQL</Typography>
          <Typography>Tools: GitHub, Visual Studio, Eclipse</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2, bgcolor: 'divider' }} />
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <Link href="/privacy-policy" color="inherit" underline="hover" aria-label="Privacy Policy">Privacy Policy</Link> | 
        <Link href="/terms-of-service" color="inherit" underline="hover" aria-label="Terms of Service"> Terms of Service</Link> | 
        <Link href="/cv" color="inherit" underline="hover" aria-label="Curriculum Vitae">Curriculum Vitae</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
