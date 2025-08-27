# Frontend

This folder contains the client-side application for the API Testing Project, providing a user interface for interacting with the backend API.

## Technologies Used

- **HTML5:** For structuring the web pages.
- **CSS3:** For styling the user interface.
- **JavaScript:** For client-side logic, form handling, and API communication.

## Pages and Functionality

- **`signup.html`**:
  - Allows new users to register by providing their first name, last name, email, and password.
  - Uses `signup.js` for form submission and API interaction.

- **`signin.html`**:
  - Allows existing users to log in with their email and password.
  - Uses `signin.js` for authentication and redirection.

- **`users.html`**:
  - Displays a list of registered users (requires successful login).
  - Provides functionality to view, update, and delete user information.
  - Uses `users.js` for fetching, displaying, and managing user data.

## How to Access

The frontend files are served statically by the backend server. Ensure the backend server is running, then open your web browser and navigate to:

- `http://localhost:3000/signup.html`
- `http://localhost:3000/signin.html`
- `http://localhost:3000/users.html`
