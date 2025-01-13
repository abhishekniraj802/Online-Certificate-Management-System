# Online Certificate Management System

## Project Overview
The **Online Certificate Management System** is a prototype designed to manage and streamline the process of certificate issuance, authorization, and user management. The project demonstrates the integration of modern frontend and backend technologies to solve complex problems in a simple, intuitive manner.

---

## Objective
The primary goal of this project is to:
- Provide a platform for managing user certificates efficiently.
- Showcase the implementation of key concepts like state persistence, user roles, and API integration.
- Develop a clean and structured codebase adhering to best practices.

---

## Features
### Admin Features:
- View all pending requests and active users.
- Create new users and reset their passwords.
- Search certificates using user ID, name, or certificate ID.
- Authorize or deauthorize certificate requests.
- Download certificates.
- Analytics dashboard with graphical representations of data.

### User Features:
- Log in with admin-provided credentials and change the password if needed.
- Request new certificates from the admin.
- Track the status of certificate requests in a card-based UI.
- Download authorized certificates.
- View request and certificate analytics on the user dashboard.

### Additional Highlights:
- **State Persistence**: Ensures the user remains logged in across tabs until logout.
- **Input Validation**: Validates all user inputs to prevent errors and ensure smooth operation.
- **Exception Handling**: Handles edge cases and errors gracefully.

---

## Tech Stack
### Frontend:
- **React** with Material-UI for component styling.
- **Axios** for HTTP requests.
- **Deployed on**: [Vercel](https://vercel.com/)

### Backend:
- **Spring Boot** with a monolithic architecture.
- **MySQL** as the database.
- **JWT Security** for secure login.
- **Deployed on**: [Railway](https://railway.app/)

### Additional Practices:
- Followed clean code principles and modular code structure.
- Integrated CORS for frontend-backend communication.
- Comprehensive API testing for various scenarios.

---

---

## How to Use
### For Admin:
1. Log in using the provided admin credentials.
2. Manage user accounts, search certificates, and authorize/deauthorize requests.
3. Access analytics to view the system's usage data.

### For Users:
1. Log in with the provided credentials and update your password.
2. Request certificates and monitor their status.
3. Download authorized certificates from your dashboard.

---

## Repository Structure
```
Online-Certificate-Management-System/
├── frontend/                # React and Material-UI code
│   ├── src/
│   │   ├── components/  # Reusable React components
│   │   ├── utils/       # Utility functions
│   └── public/      # Static assets
├── backend/                 # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/         # Controllers, services, repositories
│   │   └── resources/    # Configuration files
├── README.md             # Documentation
└── .gitignore            # Git ignored files
```

---

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the frontend directory and install dependencies:
   ```bash
   cd web
   npm install
   npm start
   ```

3. Navigate to the backend directory and run the application:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

4. Access the application at `http://localhost:5173`.

## Skills Demonstrated
- React, Material-UI, and Axios.
- Spring Boot, MySQL, and JWT.
- Frontend-backend integration.
- API development and testing.
- Clean code principles and exception handling.

---

## Open Request
If you are working on a similar project or need guidance related to React, Spring Boot, or full-stack development, feel free to connect with me! I offer free mentorship during weekends (Saturday & Sunday).

---
