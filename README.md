# Scheduled Tasks

Tasks application with scheduled reminder feature using Node.js, React, MongoDB, BullMQ, Typescript

**Remember:** Run Redis and MongoDB servers before lunch

**Warning:** This applcation isn't ready for production

## Installing Application

To install from Github, clone the repository and install dependencies using `npm`:

```sh
$ git clone git://github.com/katrieltsepelevish/scheduled-tasks.git
$ cd scheduled-tasks
```

Install the Server side dependencies, and `run`:

```sh
$ cd server
$ npm install
$ npm run dev
```

Install the `Client` side dependencies, and `run`:

```sh
$ cd ..
$ cd client
$ npm install
$ npm start
```

## Configuring

Configure the `server/.env` file before starting the application, Don't forget to **fill in** all the blank fields:

```
NODE_ENV=development
PORT=8000
ROUTES_PREFIX=/api
BASE_DOMAIN=http://localhost:8000/
CLIENT_URL=http://localhost:3000
JWT_SECRET=NQv75cpNqC32
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
MAIL_HOST=smtp.gmail.com
MAIL_USERNAME=example@gmail.com
MAIL_FROM=example@gmail.com
OAUTH_CLIENT_ID=
OAUTH_CLIENT_SECRET=
OAUTH_REFRESH_TOKEN=
OAUTH_ACCESS_TOKEN=
MONGODB_URL=mongodb://localhost:27017/scheduled-tasks
```

Same with the `client/.env` configuration file, Don't forget to **fill in** all the blank fields:

```
REACT_APP_PUBLIC_ENVIRONMENT=development
REACT_APP_PUBLIC_GITHUB_CLIENT_ID=
REACT_APP_PUBLIC_API_URL=http://localhost:8000/api
REACT_APP_BASE_DOMAIN=http://localhost:3000/
```

## API

All Api request should be prefixed with `api`

### `GET /auth/github`

Redirect the user to authorization through Github

### `GET /auth/github/callback`

Github callback after authorization with all the authorized information

### `GET /auth/me`

Return the information of the authorized user

### `GET /task`

Returns all the tasks owned by the Authorized user

### `GET /task/mark/:id`

Set the task as done / undone

Parameter :

-   `id` : (required) Id of the task

### `DELETE /task/:id`

Delete the task by Id and remove the task from reminding queue

Parameter :

-   `id` : (required) Id of the task

### `POST /task`

Create a task for authorized user and schedule the reminding feature

Parameters :

-   `title` : (required) Task title
-   `content` : (required) Task Content
-   `scheduledDate` : (required) Task remind date and time
