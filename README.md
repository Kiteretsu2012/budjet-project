<center>

<img src=".github/log.png" width="200px" />

<h2 style="font-size: 32px;">
<strong>
Budjet
</strong>
</h2>

### A role based budget management system for teams

<a href="https://budjet.me" style="font-size: 28px"><code><strong>https://budjet.me</strong></code></a>
 

</center>


## Features

- ✅ Roll based authentication system (RBAC)
- ✅ Support for creating teams and organizations
- ✅ Creating and editing budgets
- ✅ Collaboration on budgets with teams
- ✅ Uploading invoices for expenses
- 🚧 Seamless approval system from admins & authorities
- 🚧 Tagging expenses 
- 🚧 Statistics & analytics

## Setup Instructions

### Requirements

- Node.js `16.x`
- MongoDB `v5.x`
- S3 bucket and keys with proper access if you want to upload invoices
- Patience =)

## Steps

- Clone the repo
  ```sh
  git@github.com:minty-gang/budjet.git
  ```
- Make sure to start a local instance of MongoDB
- **Install backend dependencies and run the API server**
  ```bash
    cd backend
    npm i && npm start
  ```
  This should show the following message
  ```
    Connected to MongoDB Succesfully
    API running at port 5000
  ```
- **Install frontend dependencies and run the server**
  ```bash
    cd frontend
    npm i && npm run dev
  ```
- The app can now be accessed at [**http://localhost:3000**](http://localhost:3000)


## System Design

The API is designed with a RESTful approach keeping in mind declarative approach for resources. The whole RBAC system was designed and achieved with middleware patterns.

The server and the static site are hosted on Render.

## Framework usage

- Backend
  - **Node.js**
  - **Express.js**
  - **MongoDB** as database
- Frontend
  - **React.js** 
  - **Chakra UI** as a component library
  - **Formik** for forms
  - **Yup** for validation
  - **React Icons** 
  - **Ky** for API
  - **Wouter** for routing 
- Google for authentication
- Illustrations from [Storyset](https://storyset.com/)
- Logo generated with Dall-E 


## Future

We are honestly shocked that we were actually able to complete the project to this extent, even if it may not seem much. We really wanted to implement fully until the approval features but couldn't do it.

Anyway, we had a few plans with the project (along with making it more appealing and optimised, of course) and we present them here:

- Sharing of budgets
- More minute control of resources
- More frontend features to sort/filter the budget
- Import budgets from CSV/Spreadsheet 

All in all we had fun in our first hackathon of our lives! Go, TechSoc!

----
Made by [Rohith](https://github.com/RS2007/), [Ishaan](https://github.com/KlumsyKamikaze) & [Abhijit](https://abhijithota.me).