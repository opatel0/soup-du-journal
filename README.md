# Soup Du Journal
## Technologies Used
Vite/React, JSX, Express, Mongoose, Node
## Routes
### Server Side CRUD Routes
| **HTTP Method** | **URL** | **CRUD Action** | **Description** |
| --- | --- | --- | --- |
| **Users** |
| GET | /:user | READ | Show user account info |
| POST | /signup | CREATE | Create new user account |
| PUT | /:user | UPDATE | Edit user account info |
| DELETE | /:user | DELETE | Delete user account |
| **Journeys** |
| GET | /:user/journeys | READ | Index all created journeys |
| GET | /:user/:journey | READ | Show journey |
| POST | /:user/:journey | CREATE | Create new journey |
| PUT | /:user/:journey | UPDATE | Edit existing journey |
| DELETE | /:user/:journey | DELETE | Delete existing journey |
| **Experiences** |
| GET | /:user/:experience | READ | Show details of a single journey |
| POST | /:user/:experience | CREATE | Create new experience |
| PUT | /:user/:experience | UPDATE | Edit existing experience |
| DELETE | /:user/:experience | DELETE | Delete existing experience |
| **Unimplemented** |
| POST | /login | READ | Authenticate login credentials | Server |
| GET | /:user/:journey/experiences | READ | Index all created experiences per journey | Server |
| GET | /:user/experiences | READ | Index all created experiences per user | Server |
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