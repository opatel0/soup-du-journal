# Soup Du Journal
## Technologies Used
Vite/React, JSX, Express, Mongoose, Node
## Route Table
| **HTTP Method** | **URL** | **CRUD Action** | **Description** | **Client or Server Side Route**|
| --- | --- | --- | --- | --- |
| GET | / | READ | Present signup/login form | Client |
| POST | /signup | CREATE | Create new user account | Server |
| POST | /login | READ | Authenticate login credentials | Server |
| GET | /:user | READ | Show user account info | Server |
| GET | /:user/edit | READ | Present edit account form | Client |
| PUT | /:user | UPDATE | Edit user account info | Server |
| DELETE | /:user | DELETE | Delete user account | Server |
| GET | /dashboard | READ | Index public feed | Client |
| GET | /:user/journeys | READ | Index all created journeys | Server |
| GET | /:user/:journey | READ | Show journey | Server |
| GET | /journey | READ | Present create journey form | Client |
| POST | /:user/:journey | CREATE | Create new journey | Server |
| GET | /:user/:journey/edit | READ | Present update journey form | Client |
| PUT | /:user/:journey | UPDATE | Edit existing journey | Server |
| DELETE | /:user/:journey | DELETE | Delete existing journey | Server |
| GET | /:user/:journey/experiences | READ | Index all created experiences per journey | Client |
| GET | /:user/experiences | READ | Index all created experiences per user | Client |
| GET | /:user/:experience | READ | Show details of a single journey | Client |
| GET | /experience | READ | Present create experience form | Client |
| POST | /:user/:experience | CREATE | Create new experience | Server |
| GET | /:user/:experience/edit | READ | Present update experience form | Client |
| PUT | /:user/:experience | UPDATE | Edit existing experience | Server |
| DELETE | /:user/:experience | DELETE | Delete existing experience | Server |
<details>
    <summary>Planning Resources</summary>
    <h2>ERD</h2>
    <img src="./public/ERD.png" width="">
    <h2>Wireframes</h2>
    <h3>Signup/Login</h3>
    <img src="./public/signup.png" width="">
    <h3>User Dashboard</h3>
    <img src="./public/index.png" width="">
    <h3>Create Journal or Experience</h3>
    <img src="./public/create.png" width="">
    <h3>Show Journal or Experience</h3>
    <img src="./public/show.png" width="">
</details>
<details>
    <summary>Project Status</summary>
    <h2>Unsolved Problems and Development Hurdles</h2>
    <h2>Next Steps</h2>
</details>