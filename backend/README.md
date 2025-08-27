# Backend

This folder contains the Node.js Express server for the API Testing Project, responsible for handling user data and authentication.

## Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **Mongoose:** MongoDB object modeling tool for Node.js.
- **MongoDB:** NoSQL database for data storage.

## Database Schema

The `User` schema defines the structure of user documents in the MongoDB database:

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String // Note: In a real application, you should hash passwords.
});
```

## API Endpoints

All API endpoints are prefixed with `/api/v1`.

### User Management

- **`POST /api/v1/users`**
  - **Description:** Creates a new user (signup).
  - **Request Body:**
    ```json
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "password": "securepassword"
    }
    ```
  - **Response (201 Created):**
    ```json
    {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "password": "securepassword",
      "__v": 0
    }
    ```

- **`GET /api/v1/users`**
  - **Description:** Retrieves a list of all users.
  - **Response (200 OK):**
    ```json
    [
      {
        "_id": "...",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "password": "securepassword",
        "__v": 0
      }
    ]
    ```

- **`GET /api/v1/users/:id`**
  - **Description:** Retrieves a single user by their ID.
  - **Parameters:** `id` (User ID)
  - **Response (200 OK):**
    ```json
    {
      "_id": "...",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "password": "securepassword",
      "__v": 0
    }
    ```
  - **Response (404 Not Found):**
    ```json
    {
      "message": "Cannot find user"
    }
    ```

- **`PUT /api/v1/users/:id`**
  - **Description:** Updates a user by their ID. Replaces the entire user document with the provided data.
  - **Parameters:** `id` (User ID)
  - **Request Body:** (Full user object, e.g., same as POST)
    ```json
    {
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "password": "newsecurepassword"
    }
    ```
  - **Response (200 OK):** (Updated user object)

- **`PATCH /api/v1/users/:id`**
  - **Description:** Partially updates a user by their ID. Only the fields provided in the request body will be updated.
  - **Parameters:** `id` (User ID)
  - **Request Body:** (Partial user object, e.g., only `firstName`)
    ```json
    {
      "firstName": "Jonathan"
    }
    ```
  - **Response (200 OK):** (Updated user object)

- **`DELETE /api/v1/users/:id`**
  - **Description:** Deletes a user by their ID.
  - **Parameters:** `id` (User ID)
  - **Response (200 OK):**
    ```json
    {
      "message": "Deleted User"
    }
    ```

- **`DELETE /api/v1/users`**
  - **Description:** Deletes all users from the database.
  - **Response (200 OK):**
    ```json
    {
      "message": "All users deleted"
    }
    ```

### Authentication

- **`POST /api/v1/login`**
  - **Description:** Authenticates a user.
  - **Request Body:**
    ```json
    {
      "email": "john.doe@example.com",
      "password": "securepassword"
    }
    ```
  - **Response (200 OK):**
    ```json
    {
      "message": "Login successful"
    }
    ```
  - **Response (401 Unauthorized):**
    ```json
    {
      "message": "Invalid password"
    }
    ```
  - **Response (404 Not Found):**
    ```json
    {
      "message": "Cannot find user"
    }
    ```

## Setup and Running

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start the Server:**
   ```bash
   node server.js
   ```
   The server will start on `http://localhost:3000`.
