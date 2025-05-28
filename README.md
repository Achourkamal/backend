## GMC-Backend

## PROJECT Overview

This project is an Express.js application built for creating  a Basic MERN eCommerce application with Authentication.

## Installation and Setup

- **Install dependencies**: `npm install`

- **Set up environment variables**:
   - Create a file named `.env` in the project’s root folder.
   - Copy everything from the `.env.example` file into your new .env file.
   - Update the values if needed, like adding your own database URL.

## Project Structure

The project is organized as follows:

- 📦node_modules
- 📦src
  - 📂controllers     **Code for app logic
    - 📜example.js
  - 📂helpers         **Helper functions used across the app
    - 📜somme.js
  - 📂middlewares     **Middleware like error handling and validation
    - 📂validators
      - 📜example.ts
  - 📂models          **Data models for MongoDB
      - 📜example.js
  - 📂routes          **API route definitions
    - 📜example.route.js
    - 📜index.js
  - 📜server.ts       **Main file to start the server
📜.env                **Environment variables (like database info)
📜package-lock.json   **Locked dependencies list
📜package.json        **Project info and scripts
📜README.md           **Documentation for the project

## Development Tools

- [JavaScript](https://www.javascript.com/)
  - Main language for both frontend and backend.

- [Node.js](https://nodejs.org/en)
  - JavaScript runtime environment for the backend.

- [express](https://expressjs.com/)
  - Web framework for building APIs.

- [MongoDB](https://www.mongodb.com/)
  - NoSQL database for storing app data.

- [Prettier](https://prettier.io/)
  - Code formatting tool to keep style consistent.

- [nodemon](https://nodemon.io/)
  - Development tool that restarts the server when code changes.

## Coding Guidelines

  # Commenting Code

- Language: Write comments in `English`.
- Format: Leave a space after `//`, `/*` or `*/`.
  - Good: `/* my comment */`
  - Bad: `/*my comment*/`
- Explain the purpose and functionality of the code.
- Use comments for complex or non-obvious code.
- Comment workarounds or temporary solutions.
- Use the [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) extension for readability.

### Error Handling Rules

- Use the `handleError` function to handle errors by centralizing JSON responses to clients with a status code and error message.
- For example : `handleError(res, error, "Error during operation", 500);`

- Use `try/catch` with `async/await` to handle errors gracefully in asynchronous functions. This allows you to catch and process errors within a try block while awaiting the result, like this:

- `try {`
    `const data = await fetchData();`
`} catch (error) {`
    `handleError(res, error, "Error fetching data", 500);`
`}`

### File Naming Conventions

- The naming convention for files should be **Dot Case**.
- The file name should describe the purpose of the file.
- For example, if the file contains logic for example controller, it should be named `example.controller.js`.

### Directory Naming Conventions

- The naming convention for directories should be lowerCamelCase.
- The directory name should describe the purpose of the directory.
- For example : `controllers` , `helpers` ...

### Variable/Constant Naming Conventions

- The naming convention for variables and constants should be **lowerCamelCase**.
- The variable name should describe the value stored in the variable/constant.
- For example, if the variable stores the username, it should be named `userName`.
- We should avoid unclear variable names, like `let x`.

### Interface Naming Conventions

- The naming convention for interfaces should be **UpperCamelCase**.
- The interface name should describe the purpose of the interface.
- For example, if the interface defines the properties of a user, it should be named `UserProperties`.

### Git Commit Rules

- **Commit Messages**: Commit messages should start with a capital letter and should end with a period. The message should be concise but descriptive enough to understand the changes made. For example, "Add example controllers."


## Scripts

The project includes the following npm scripts:
- `dev`: Starts the application with nodemon dependency.