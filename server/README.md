<head>
    <div align="center">
        <h1 align="center">Candidate Finder (Server)</h1>
    </div>
</head>

<div align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933.svg?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/-Express-000000.svg?style=for-the-badge&logo=express&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img alt="MySQL" src="https://img.shields.io/badge/-MySQL-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/-Prisma-2D3748.svg?style=for-the-badge&logo=prisma&logoColor=white" />
  <img alt="JSON Web Tokens" src="https://img.shields.io/badge/-JWT-000000.svg?style=for-the-badge&logo=JSONWebTokens&logoColor=white" />
  <img alt="Nodemon" src="https://img.shields.io/badge/-Nodemon-76D04B.svg?style=for-the-badge&logo=nodemon&logoColor=white" />
  <img alt="Jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
</div>

</br>

## Requirements & Dependencies

- Node.js
- NPM
- MySQL

## Setup & Run

Prior to setup, create an `.env` file based on the `.env.example` file, and fill in the required vars.
Then proceed:

- Install all the required dependencies, listed above.
- Run `npm install` in the `server/` directory.
- Run `npm run migrate`.
- Run `npm run dev`.

You can now access the API, using the host and port, provided in the `.env` file.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.

### `npm run start`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run migrate`

Migrating your database schema in a development environment.

### `npm run test`

Testing recommendation functions.
