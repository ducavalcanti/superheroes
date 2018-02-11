# Super Hero Catalogue - A RESTFul API
This project is an example of RESTful API using Node.js.

## Endpoints
This README.md file lists all the endpoints of this API.

All endpoints must set the header: 
* **Content-Type**: **application/x-www-form-urlencoded**

## Authentication
The authentication process is done through here. All endpoints (except this one) have to set the **x-access-token** header (which value is the token provided by the Login User endpoint - if logged in successfully).

### Login User (POST /auth/login):
Used to log in a user. Returns a token used to authenticate in the majority of endpoints.

The following body keys are required:
* username
* password

## Users
Here are described all endpoints according to users manipulation.

### Create Admin (GET /setup):
This endpoint is used to create the first user (admin) in the database;

### Create User (POST /users):
Creates a new user with the **standard** role. Requires authentication.

The following body keys are required:
* username
* password

### List Users (GET /users):
List all users. Requires authentication.

Optionally, you can set the following headers:
* **pageNum**: the number of the page (default: _0_);
* **pageSize**: the number of records per page (default: _10_);

### Get Single User (GET /users/:username):
Gets a single user from the database. Requires authentication.
Replace the URL param **:username** by the username of the desired user.

### Update User (PUT /users/:username):
Updates a single user from the database. Requires authentication.
Replace the URL param **:username** by the username of the desired user.

The following body keys are accepted:
* username
* password

### Delete User (DELETE /users/:username):
Deletes a single user from the database. Requires authentication.
Replace the URL param **:username** by the username of the desired user.

## Super Heroes
Here are described all endpoints according to Super Heroes manipulation.

### Create Super Hero (**POST** /heroes):
Creates a single super hero. Requires authentication.

The following body keys are required:
* name: The hero's name (ex. Superman);
* alias: The hero's common name (ex. Clark Kent);

### List Super Heroes (GET /heroes):
Retrieves a list of super heroes. Requires authentication.

Optionally, you can set the following headers:
* **pageNum**: the number of the page (default: _0_);
* **pageSize**: the number of records per page (default: _10_);

### Get Single Super Hero (GET /heroes/:heroId):
Gets a single super hero from the database. Requires authentication.
Replace the URL param **:heroId** by the id of the desired hero.

### Update Super Hero (PUT /heroes/:heroId):
Updates a single super hero from the database. Requires authentication.
Replace the URL param **:heroId** by the id of the desired hero.

The following body keys are accepted:
* name
* alias

### Delete Super Hero (DEL /heroes/:heroId):
Deletes a single super hero and - all powers associated - from the database. Requires authentication.
Replace the URL param **:heroId** by the id of the desired hero.

### Set Protection Area (POST /heroes/:heroId/area):
Creates and assigns a protection area to a single super hero. Requires authentication.
Replace the URL param **:heroId** by the id of the desired hero.

The following body keys are required:
* name: area name (ex. New York)
* lat: latitude
* long: longitude
* radius: the area radius in meters

## Super Powers
Here are described all endpoints according to Super Heroes manipulation.

### Create Super Power (POST /powers/:heroId):
Creates a single super power and associate it to hero. Requires authentication.
Replace the URL param **:heroId** by the id of the desired hero.

The following body keys are required:
* name: Power name (ex.: X-Ray Vision)
* description: Power description (ex.: Makes possible seeing through walls)

### List Super Powers (GET /powers):
Retrieves a list of super powers. Requires authentication.

Optionally, you can set the following headers:
* **pageNum**: the number of the page (default: _0_);
* **pageSize**: the number of records per page (default: _10_);

### Get Single Super Power (GET /powers/:powerId):
Gets a single super power from the database. Requires authentication.
Replace the URL param **:powerId** by the id of the desired power.

### Update Super Power (PUT /powers/:powerId):
Updates a single super power from the database. Requires authentication.
Replace the URL param **:powerId** by the id of the desired power.

The following body keys are accepted:
* name
* description

### Delete Super Power:
This method is not avaiable. All super powers are assigned to a hero. When the hero is deleted, their super powers are also removed from the database.

## Audit Events
When a create, update or delete action is taken, an Audit Event is automatically created.

### Subscribe to Audit Events (GET /subscribe):
Users can visualize the audit events being generated in real time by accessing this endpoint in a browser.

## Roles
There are two roles at this moment: 'admin' and 'standard'.

### List Roles By User (GET /roles/:username):
This endpoint lists the set of roles of a single user.
Replace the URL param **:username** by the username of the desired user.
