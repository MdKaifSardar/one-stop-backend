# 🛒 One Stop — E-Commerce Backend

A RESTful backend for an e-commerce platform, providing the server-side foundation for user authentication, product management, shopping cart operations, and order workflows.

The application follows a modular backend architecture with dedicated controllers, routes, models, middleware, and helper utilities, backed by MongoDB through Mongoose.

---

## ✨ Overview

**One Stop Backend** provides the API and data layer for an online shopping platform.

The backend handles core commerce operations including user authentication, product management, cart management, and order processing. The codebase is organized into dedicated layers to keep routing, business logic, database models, and middleware separated and maintainable.

The project also includes configuration for running the backend in a serverless deployment environment.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure password hashing with bcrypt
* Protected API routes
* Authentication middleware
* Token-based user authorization

### 📦 Product Management

* Product creation and management
* Product retrieval
* Product updates
* Product deletion
* Slug-based product identification
* MongoDB-backed product persistence

### 🛒 Shopping Cart

* Add products to cart
* Update cart items
* Remove products from cart
* Persistent cart data
* User-specific cart operations

### 📋 Order Management

* Create orders
* Store order information
* Retrieve user-specific orders
* Persistent order data
* Server-side order workflows

### 🧩 Modular Architecture

* Controller-based business logic
* Dedicated API routes
* Mongoose data models
* Authentication middleware
* Reusable helper functions
* Environment-based configuration

### ☁️ Deployment

* Vercel deployment configuration
* Serverless HTTP support
* Environment-variable based configuration

---

## 🧰 Tech Stack

| Technology             | Purpose                          |
| ---------------------- | -------------------------------- |
| **Node.js**            | JavaScript runtime               |
| **Express.js**         | REST API framework               |
| **MongoDB**            | Primary database                 |
| **Mongoose**           | MongoDB ODM                      |
| **JSON Web Token**     | Authentication                   |
| **bcrypt**             | Password hashing                 |
| **CORS**               | Cross-origin request handling    |
| **Morgan**             | HTTP request logging             |
| **dotenv**             | Environment configuration        |
| **express-formidable** | Request/form data handling       |
| **slugify**            | URL-friendly product identifiers |
| **serverless-http**    | Serverless deployment support    |
| **Nodemon**            | Development workflow             |

---

## 🏗️ Architecture

```text
Client
  │
  ▼
Express Router
  │
  ▼
Middleware
  │
  ├── Authentication
  └── Request Processing
  │
  ▼
Controller
  │
  ▼
Mongoose Model
  │
  ▼
MongoDB
  │
  ▼
API Response
```

---

## 📁 Project Structure

```text
one-stop-backend/
│
├── Config/
│   └── Database and application configuration
│
├── controllers/
│   └── Request handlers and business logic
│
├── helpers/
│   └── Shared backend utilities
│
├── middlewares/
│   └── Authentication and request middleware
│
├── models/
│   └── Mongoose data models
│
├── routes/
│   └── API route definitions
│
├── index.js
│   └── Application entry point
│
├── vercel.json
│   └── Deployment configuration
│
├── package.json
└── package-lock.json
```

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have:

* Node.js installed
* npm installed
* A MongoDB database

### 1. Clone the repository

```bash
git clone https://github.com/MdKaifSardar/one-stop-backend.git
cd one-stop-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

```env
MONGODB_URI=
JWT_SECRET=
```

Add any additional environment variables required by your deployment configuration.

> **Important:** Never commit database credentials, JWT secrets, API keys, or other sensitive configuration to the repository.

### 4. Start the development server

```bash
npm run server
```

The development server runs with Nodemon.

### 5. Start the production server

```bash
npm start
```

---

## 💻 Development Scripts

| Command          | Description                             |
| ---------------- | --------------------------------------- |
| `npm start`      | Start the backend                       |
| `npm run server` | Start the backend with Nodemon          |
| `npm run client` | Start the associated client application |
| `npm run dev`    | Run client and server concurrently      |

---

## 🔑 Environment Configuration

| Variable      | Purpose                            |
| ------------- | ---------------------------------- |
| `MONGODB_URI` | MongoDB connection string          |
| `JWT_SECRET`  | Secret used for JWT authentication |

> Variable names may need to match the configuration used by the current application code.

---

## ☁️ Deployment

The repository includes Vercel configuration and `serverless-http`, allowing the Express application to be adapted for serverless deployment.

For production deployment:

1. Configure production environment variables.
2. Configure the production MongoDB database.
3. Configure allowed CORS origins.
4. Set a secure JWT secret.
5. Verify all API routes after deployment.

---

## 🔒 Security

For production environments:

* Keep secrets in environment variables.
* Use a strong JWT secret.
* Never expose database credentials to clients.
* Restrict CORS origins where appropriate.
* Use a dedicated production database user.
* Validate and sanitize user-controlled input.
* Keep authentication logic on the server.

---

## 📌 Project Highlights

* RESTful e-commerce API
* Express.js backend architecture
* MongoDB persistence with Mongoose
* JWT-based authentication
* bcrypt password hashing
* Modular controllers and routes
* Middleware-based authorization
* Product, cart, and order workflows
* Serverless deployment support

---

## 📄 License

This project is provided for development and portfolio purposes.
