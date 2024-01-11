# Posts-Chats

- This project is intended for the creation of publications and their discussion.
- The root project contains the server and client directories, which are separate projects.
- The project located in the server directory is an API written in Laravel and is the server part of the Posts-Chats project. This project performs JWT authentication, creation, storage, editing, deletion, and issuing of posts and comments on them.
- The project located in the client directory is the client part of the Posts-Chats project, written in React. This part of the project contains the user interface, displays posts and comments, and makes the necessary requests to the backend (API).

## Project Installation

- Clone the **_GIT_** repository.
- Move to the **_project directory_**.

### Server part installation

- Move to the **_server_** project directory.
- Install the project dependencies from the **_Composer_**:
    > composer install
- Create a **_.env_** file from the copy of **_.env.example_**:
    > cp .env.example .env
- Generate the encryption key:
    > php artisan key:generate
- Create an empty database for the project.
- Configure the **_.env_** file to allow a connection to the database.
- Clean and cache the config:
    > php artisan cache:clear

    > php artisan config:clear

    > php artisan config:cache
- Add tables to the database:
    > php artisan migrate
- Fill the database with the fake data:
    > php artisan db:seed
- Run the server (for local server):
    > php artisan serve

### Client part installation

- Move to the **_server_** project directory.
- Install the project dependencies from the **_npm_**:
    > npm install
- Run the project (locally):
    > npm start
- Build the project (on server):
    > npm run build
