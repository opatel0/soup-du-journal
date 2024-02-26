# Soup Du Journal
## Technologies Used
Vite/React, JSX, Express, Mongoose, Node
## Routes
### Server Side CRUD Routes
| **HTTP Method** | **URL** | **CRUD Action** | **Description** |
| --- | --- | --- | --- |
| **Users** |
| GET | /users/:user | READ | Show user account info |
| POST | /users/signup | CREATE | Create new user account |
| PUT | /users/:user | UPDATE | Edit user account info |
| DELETE | /users/:user | DELETE | Delete user account |
| **Journeys** |
| GET | /journeys/:user/journeys | READ | Index journeys per user |
| GET | /journeys/:journey | READ | Show journey |
| POST | /journeys/:user| CREATE | Create journey |
| PUT | /journeys/:journey | UPDATE | Edit journey |
| DELETE | /journeys/:journey | DELETE | Delete journey |
| **Experiences** |
| GET | /:user/userexperiences | READ | Index experiences per user |
| GET | /:journey/journeyexperiences | READ | Index experiences per journey |
| GET | /experiences/:experience | READ | Show details of a single journey |
| POST | /experiences/:user/:journey | CREATE | Create new experience |
| PUT | /experiences/:experience | UPDATE | Edit existing experience |
| DELETE | /experiences/:experience | DELETE | Delete existing experience |
| **Unimplemented** |
| POST | /login | READ | Authenticate login credentials |
| GET | /dashboard | READ | Index public feed |

### Client Side Routes
| **HTTP Method** | **URL** | **CRUD Action** | **Description** |
| --- | --- | --- | --- |
| GET | / | READ | Present signup/login form |
| GET | /:user/edit | READ | Present edit account form |
| GET | /journey | READ | Present create journey form |
| GET | /:user/:journey/edit | READ | Present update journey form |
| GET | /experience | READ | Present create experience form |
| GET | /:user/:experience/edit | READ | Present update experience form |

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