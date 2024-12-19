# Social Networking Platform with Node.js, Express, and MongoDB

This project demonstrates the development of a RESTful API using Node.js, Express.js, and MongoDB. It includes user authentication, post management, comment and like functionalities, a friendship system, and an OTP-based password reset feature.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
  - [User Authentication](#user-authentication)
  - [Post Management](#post-management)
  - [Comment System](#comment-system)
  - [Like Functionality](#like-functionality)
  - [Friendship Features](#friendship-features)
  - [User Profile Updates](#user-profile-updates)
  - [OTP-Based Password Reset](#otp-based-password-reset)
- [Project Setup](#project-setup)
- [Dependency Installation](#dependency-installation)
- [Technologies Used](#technologies-used)
- [Author](#Author)
- [Links](#Links)

## Project Overview

The RESTful API provides functionalities for user authentication, post and comment management, like and friendship systems, and a secure OTP-based password reset feature. It uses modular ES6 syntax for better maintainability and MongoDB for efficient data handling.

## Features

### User Authentication

- User registration with fields: name, email, password, gender.
- Login and logout functionalities.
- Advanced feature: Logout from all devices by storing login tokens in an array field within the user's document.

### Post Management

- CRUD operations for posts with fields: caption and image URL.
- Posts reference the user who created them.
- Posts can be updated or deleted only by their owner.

### Comment System

- Add, update, and delete comments on posts.
- Comments can only be updated or deleted by their owner or the commenter.

### Like Functionality

- Like/unlike posts.
- Count and display likes and comments on posts.
- Populate user information (id, name, email) for likes, comments, and posts.

### Friendship Features

- Manage user friendships with features like:
  - Get user friends.
  - Manage pending friend requests.
  - Toggle friendships.
  - Accept/reject friend requests.

### User Profile Updates

- Update user profiles (name, gender, avatar).
- Enable avatar uploads for user profiles.

### OTP-Based Password Reset

- Send OTP for password reset using Nodemailer.
- Verify OTP and reset the password.

## Project Setup

1. Clone the repository.
2. Create a `.env` file for environment variables (e.g., MongoDB URI, JWT secret, email configurations).
3. Set up a MongoDB database.
4. Start the server.

## Dependency Installation

Run the following commands to install the necessary dependencies:

```bash
npm install
```

Start the server:

```bash
npm index.js
```

This project showcases a robust RESTful API architecture with modular design, user-friendly features, and secure data handling.

## Technologies Used

- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **API Testing**: Postman
- **Email Communication**: Nodemailer
- **State Management**: JSON Web Tokens (JWT)

## Author

[@Aniket2602](https://github.com/Aniket2602)

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/aniket-sangale/)
