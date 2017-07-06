# nutriSNP
[live site](https://nutrisnp.herokuapp.com/)

Advanced calorie and macronutrient calculator based on users' unique genetic variants. Allows users to import their results from 23andMe and input some basic information about themselves to reveal recommendations tailored to them.

## Getting Started

In order to get a copy of this application running on your local machine, simply download this repository and run the following command in the project folder.

```
$ npm install
```

This will install all of the necessary project dependencies. 

Next, you will need to set up a local database.

NutriSNP uses the Knex.js module to communicate with a Postgresql database. The database configuration may be updated in the knexfile.js file to coincide with your local database. Once configured, the following commands may be run to migrate and seed the *development* database:

```
$ knex migrate:latest
$ knex seed:run
```

Once the database had been configured and all dependecies have been installed, you may run the application with the following command:

```
$ npm start
```

This will run nutriSNP on port 3000.

## Data Model



## Running the tests

The *test* folder contains automated tests to ensure all the basic routes are working and responding with the correct statuses.

When changes are made, these tests may be run with the following command to ensure routes are still working as expected:

```
$ npm test
```

## Powered By

* [23andMe](http://www.23andMe.com) - Genetic Testing and Reporting
* [Heroku](https://www.heroku.com/) - Web hosting
* [Materialze](http://materializecss.com/) - CSS framework

