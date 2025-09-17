# Zenith-X Flight Test & Evaluation Center

## Overview

This is my NSS Capstone project.  
It is a **React-based web application** that streamlines defense flight test scheduling and system coordination.

Customers will be able to:

- Create and manage test requests
- View and edit requests in draft status
- Browse available test ranges and systems

Employees will be able to:

- See all requests
- Approve or reject requests

Admins will be able to:

- Manage users (add, delete)

## Tech Stack

- React (Vite)
- React Router
- JSON Server (API)
- CSS (for styling)
- Git & GitHub (version control)

## Database (Mock with JSON Server)

- Users
- Ranges
- Systems
- Requests
- Request_Systems (junction table for many-to-many)
