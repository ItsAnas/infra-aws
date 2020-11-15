# Api Boilerplate

## Table of Content

* [Api Boilerplate](#Api-Boilerplate)
  * [Table of Content](#Table-of-Content)
  * [Features](#Features)
    * [Logging](#Logging)
    * [Hot Reload](#Hot-Reload)
    * [Routes as Classes](#Routes-as-Classes)
    * [Configuration with Environment Variables](#Configuration-with-Environment-Variables)
    * [Formatted Errors](#Formatted-Errors)
  * [Installation](#Installation)
    * [Clone the repository](#Clone-the-repository)
    * [Install NodeJS](#Install-NodeJS)
    * [Install Yarn (optional)](#Install-Yarn-optional)
    * [Install node dependencies](#Install-node-dependencies)
  * [Usage](#Usage)
    * [Start as development server](#Start-as-development-server)
    * [Start as production server](#Start-as-production-server)
  * [Configuration](#Configuration)
    * [Server URL](#Server-URL)
    * [Server Port](#Server-Port)
  * [Create a Route](#Create-a-Route)

## Features

### Logging

This boilerplate uses `morgan` for `express` routing logs and `winston` for general purpose logs.

### Hot Reload

The development server uses `nodemon` to include a hot reload feature.

### Routes as Classes

This boilerplate is designed to be easy to extend upon using classes to define routes. (cf [Route.js](src/routes/Route.js#Route))

### Configuration with Environment Variables

Environment variables are used to configure the server. Also, the `dotenv` package is used to simplify usage in development mode. You can easily configure the server url and port using a file named `.env` located at the root of the project. (cf [Configuration](#Configuration))

### Formatted Errors

Errors are automatically formatted to be sent on the network using a middleware and custom Errors. Custom errors can be created using the [ApiError](src/errors/ApiErrors/ApiError.js) interface.

## Installation

### Clone the repository

```bash
git clone https://gitlab.com/Mintoo200/api.git
```

### Install NodeJS

ArchLinux: `sudo pacman -Syu node`

### Install Yarn (optional)

To manage packages, we recommand using `yarn`.

```bash
npm install -g yarn
```

### Install node dependencies

* Using npm: `$ npm install`
* Using yarn (recommended): `$ yarn`

## Usage

### Start as development server

* Using npm: `$ npm run start`
* Using yarn (recommended): `$ yarn start`

### Start as production server

* Using npm: `$ npm run start:production`
* Using yarn (recommended): `$ yarn start:production`

## Configuration

The API can be configured using environment variables.
These variables can be set using a `.env` file located at the root of the project when in development mode (cf [dotenv](https://github.com/motdotla/dotenv#readme)).

### Server URL

`API_ADDRESS`: default value is `localhost`

### Server Port

`API_PORT`: default value is `5000`

## Create a Route

To create a route, implement a class extending [Route](src/routes/Route.js#Route). Then add it to your router using [routerify(Route)](src/routes/Route.js#routerify)