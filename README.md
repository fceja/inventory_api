# Description

A Node Express Server that provides enpoints for Inventory App.

<br/>

This project works together with the following repositories:
- Frontend - https://github.com/fceja/inventory_front_end
- Database - https://github.com/fceja/inventory_db


## Installation
![](https://img.shields.io/badge/OS-Linux%20%7C%20MacOS%20%7C%20Windows-eaeaea)
1. Install Node:
   - ```
     https://nodejs.org/en/download
     ```
2. Clone repo
3. Install dependencies, at project root run:
   - ```
     npm install
     ```

4. Run server
   - **Note: sample environment file is provided at project root, modify as needed
   - ```
     ts-node --require ./tsconfig-paths-bootstrap.ts ./src/Server.ts
     ```
   - Server running on `http://localhost:3000/`

## Tools & Technologies
<p>
   <a href="https://nodejs.org/en/about" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg"
      alt="nodejs"
      width="40"
      height="40"
    /></a>
  <a href="https://expressjs.com/" target="_blank" rel="noreferrer">
    <img
      src="https://expressjs.com/images/favicon.png"
      alt="expressjs"
      width="40"
      height="40"
    /></a>
  <a href="https://jwt.io/" target="_blank" rel="noreferrer">
    <img
      src="https://jwt.io/img/favicon/apple-icon-72x72.png"
      width="40"
      height="40"
      alt="jsonwebtoken"
    /></a>
</p>
