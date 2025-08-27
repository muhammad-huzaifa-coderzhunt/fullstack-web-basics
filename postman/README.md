# Postman Collection

This folder contains the Postman collection for testing the API endpoints of the API Testing Project.

## File:

- `Users Management.postman_collection.json`: This JSON file contains a collection of pre-configured requests for all the API endpoints, including:
    - User creation (Signup)
    - User login (Signin)
    - Get all users
    - Get user by ID
    - Update user by ID (PUT and PATCH)
    - Delete user by ID
    - Delete all users

## How to Use:

1.  **Import into Postman:** Open Postman, click on "Import" and select the `Users Management.postman_collection.json` file.
2.  **Environment Variables:** Ensure your Postman environment is set up correctly, especially if your API is running on a different host or port than `http://localhost:3000`.
3.  **Run Requests:** You can now execute the requests defined in the collection to test the API.
