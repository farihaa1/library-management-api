# 📚 Library Management API

A clean and scalable **Library Management REST API** built with:

- **Node.js**
- **Express.js**
- **TypeScript**
- **MongoDB**
- **Mongoose**

This API provides complete CRUD operations for managing books with proper validation, error handling, filtering, sorting, and query support.

---

## Links

**GitHub Repository:**  
https://github.com/farihaa1/library-management-api

**Live Deployment:**  
https://library-management-api-teal-nu.vercel.app/

---



---

#  Features

## Book Management

- ✅ Create new books
- ✅ Retrieve all books
- ✅ Retrieve a single book by ID
- ✅ Update book information
- ✅ Delete books

## Advanced Features

- TypeScript support
- Mongoose schema validation
- Global error handling middleware
- Async error handling wrapper
- Book genre restrictions
- Automatic availability calculation
- Filtering support
- Sorting support
- MongoDB ObjectId validation

---

# Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| TypeScript | Type safety |
| MongoDB | Database |
| Mongoose | ODM |
| ESLint | Code quality |

---

# Project Structure

```text
src
│
├── app.ts
│
├── error
│   └── appError.ts
│
├── middlewares
│   └── errorHandler.ts
│
├── modules
│   └── books
│       │
│       ├── books.controller.ts
│       ├── books.service.ts
│       ├── books.model.ts
│       ├── books.routes.ts
│       ├── books.interface.ts
│       └── books.constrain.ts
│
└── utils
    ├── catchAsync.ts
    └── sendResponse.ts
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/library-management-api.git

cd library-management-api
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file:

```env
PORT=5000

DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/library

NODE_ENV=development
```

---

# Run Project

### Development Mode

```bash
npm run dev
```

### Production Build

```bash
npm run build

npm start
```

---

# API Documentation

## Base URL

```
http://localhost:5000/api/books
```

---

# 📌 API Endpoints

## 1️⃣ Create Book

### POST

```
/api/books
```

### Request Body

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "FICTION",
  "isbn": "9780061122415",
  "description": "A spiritual journey story",
  "copies": 5
}
```

### Response

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {}
}
```

---

# 📕 Borrow Management

The Borrow module manages book borrowing operations.

When a user borrows a book, the system:

- Checks if the book exists
- Checks book availability
- Validates available copies
- Deducts borrowed quantity
- Updates book availability automatically
- Creates a borrow record

---

# Borrow Module Structure

```text
modules
│
└── borrow
    │
    ├── borrow.controller.ts
    ├── borrow.service.ts
    ├── borrow.model.ts
    ├── borrow.routes.ts
    └── borrow.interface.ts
```

---

# Borrow API Endpoint

## Borrow a Book

### POST

```
/api/borrow
```

---

## Request Body

```json
{
  "book": "6657c8b12a9e123456789",
  "quantity": 2,
  "dueDate": "2026-07-01"
}
```

---

## Response

```json
{
  "success": true,
  "message": "Book borrowed Successfully",
  "data": {
    "book": "6657c8b12a9e123456789",
    "quantity": 2,
    "dueDate": "2026-07-01"
  }
}
```

---

# Borrow Business Logic

## 1. Find Book

The system searches the book collection using:

```ts
Book.findById(bookId)
```

If the book does not exist:

```json
{
  "success": false,
  "message": "book is not found"
}
```

---

## 2. Check Availability

Before borrowing:

```ts
if(!book.available)
```

The system blocks unavailable books.

Example:

```json
{
  "success": false,
  "message": "Book is not available"
}
```

---

## 3. Check Available Copies

The system verifies:

```ts
book.copies >= quantity
```

Example:

Book:

```
copies: 3
```

Borrow request:

```
quantity: 5
```

Response:

```json
{
  "success": false,
  "message": "not enough copies available"
}
```

---

# Automatic Copy Update

Before borrowing:

```
Book
{
 copies: 10,
 available: true
}
```

Borrow:

```json
{
 "quantity": 3
}
```

After borrowing:

```
Book
{
 copies: 7,
 available: true
}
```

---

# Borrow Database Model

```ts
{
 book: ObjectId,

 quantity: Number,

 dueDate: Date,

 createdAt: Date,

 updatedAt: Date
}
```

---

# Book Relationship

Borrow collection references Book:

```ts
book: {
 type: Schema.Types.ObjectId,
 ref: "Book"
}
```

Relationship:

```
Borrow
   |
   |
   ↓
 Book
```

---

# Borrow Validation

The API validates:

- ✅ Book ID exists
- ✅ Quantity is at least 1
- ✅ Due date required
- ✅ Available copies check
- ✅ Book availability status

---

# Example Flow

### Before Borrow

```json
{
"title": "The Alchemist",
"copies": 5,
"available": true
}
```

Borrow Request:

```json
{
"quantity": 2
}
```

After Borrow:

```json
{
"copies": 3,
"available": true
}
```

If copies become:

```
0
```

Then:

```json
{
"available": false
}
```

---