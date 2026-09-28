# 🛍️ StoreFlow

A full-stack e-commerce application built with the MERN stack.

🌐 **[Live Demo](https://storeflow-client.onrender.com)**

StoreFlow provides a secure authentication system using JWT access and refresh tokens, along with a complete Product CRUD API and a React frontend for managing and browsing products.

## 🚀 Features

### Authentication
- User registration
- User login
- JWT access tokens
- JWT refresh tokens
- Secure HTTP-only refresh-token cookies
- Token refresh and rotation
- Logout with refresh-token invalidation
- Get authenticated user profile
- Password hashing with bcrypt

### Product Management
- Create products
- View all products
- View a single product
- Update products
- Delete products
- Product image uploads
- Image replacement using ImageKit
- Product sizes and stock management

### Validation & Security
- Request validation using `express-validator`
- Protected product write operations
- Bearer token authentication
- MongoDB data storage
- Environment variables for secrets
- Passwords are never returned in API responses

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- React Hot Toast
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator
- Multer
- ImageKit
- Cookie Parser

---

## 📁 Project Structure

```text
StoreFlow/
│
├── client/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── utils/
│   ├── config/
│   ├── .env
│   └── package.json
│
└── README.md
```

---

# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd StoreFlow
```

## 2. Install backend dependencies

```bash
cd server
npm install
```

## 3. Create the backend environment file

Create:

```text
server/.env
```

Add:

```env
NODE_ENV=development

PORT=3000

MONGO_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

COOKIE_SECURE=false
COOKIE_SAME_SITE=lax

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

> Never commit your `.env` file to GitHub.

## 4. Start the backend

From the `server` directory:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

---

## 5. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
```

## 6. Start the frontend

```bash
npm run dev
```

The frontend will run on the Vite development server, usually:

```text
http://localhost:5173
```

---

# 🔐 API Endpoints

Base URL:

```text
/api
```

## Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive an access token |
| POST | `/api/auth/refresh-token` | Public* | Generate a new access token |
| POST | `/api/auth/logout` | Authenticated | Logout and invalidate refresh token |
| GET | `/api/auth/me` | Authenticated | Get logged-in user profile |

`*` A valid refresh token is required.

---

## Products

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/products` | Authenticated | Create a product |
| GET | `/api/products` | Public | Get all products |
| GET | `/api/products/:id` | Public | Get a product by ID |
| PUT | `/api/products/:id` | Authenticated | Update a product |
| DELETE | `/api/products/:id` | Authenticated | Delete a product |

---

# 🔑 Authentication

Protected endpoints require an access token in the `Authorization` header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

The refresh token is stored in an HTTP-only cookie and is used to obtain a new access token when the access token expires.

---

# 📦 Product Data

A product contains:

- Title
- Description
- Price
- Currency
- Images
- Sizes
- Stock

Supported currencies:

```text
INR
USD
```

Supported sizes:

```text
XS
S
M
L
XL
XXL
```

Product images are uploaded using Multer and stored using ImageKit.

---

# 🛡️ Validation

StoreFlow uses `express-validator` to validate API requests.

Validation includes:

- Required fields
- Email format
- Password validation
- Confirm password matching
- Product field types
- Product price
- Product stock
- Product sizes
- MongoDB product IDs

Invalid requests return a `400` response with field-level validation errors.

---

# 🔒 Security

- Passwords are hashed using bcrypt.
- JWT secrets are stored in environment variables.
- Access tokens are short-lived.
- Refresh tokens are stored server-side.
- Refresh tokens are stored in HTTP-only cookies.
- Refresh tokens can be invalidated during logout.
- Protected product operations require authentication.
- `.env` files are excluded from Git.

---

# 📸 Image Upload

Product images are handled using:

```text
React FormData
      ↓
Multer
      ↓
ImageKit
      ↓
Image URL
      ↓
MongoDB
```

Up to 5 images can be uploaded for a product, with a maximum file size of 2MB per image.

---

# 🎯 Project Purpose

StoreFlow was built as part of a backend and full-stack learning journey to understand:

- JWT authentication
- Access and refresh token flow
- Protected routes
- REST APIs
- Express middleware
- Request validation
- MongoDB and Mongoose
- File uploads
- ImageKit integration
- React API integration
- Product CRUD operations

---

# 👨‍💻 Author

**Md Ali Haider**

Full Stack Developer | MERN Stack

**GitHub:** https://github.com/md-alihaider

**Portfolio:** https://mdalihaider.vercel.app/