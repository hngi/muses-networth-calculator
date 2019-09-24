# MUSES NET WORTH CALCULATOR
If you are already familiar with Laravel framework,
1. Fork the repository
2. run `composer install` (install the vendor folder)
3. run `npm install` (to install the VueJS dependencies)
The execution of the dependency is dependent on:
* For development: run `npm run watch`  
* For production: run `npm run production`  

# LARAVEL FRAMEWORK

The laravel framework apllies the MVC model. The model are used for database manipulations, the View handles what the user is expected to see and the Controller interact between the Model and the Views.
This project uses just one model called User (within the app folder) which references the user table.
The controllers for the project are located in the `app/Http/Controller` folder. The controllers handles user registration, login and authentication of routes.
The Views for the entire project is within the `resources/views` folder.


## How do we set up the server?
To set up this project, you need the following:
1. Laravel requires a server with PHP version of more than 7.0 (recommended: wampserver)


## What do we need to have installed?
1. first download and install composer
Then on your command line within the project folder
2. Run composer install 
3. npm install (installs the VueJS dependencies)
The execution of the dependency is dependent on:
* For development: run `npm run watch` (this is required for developers)
* For production: run `npm run production`  (this is required for project deployment)

## What about database?
The database was created using migrations. 
1. To setup the database you need to first create your database on you server.
2. Duplicate the sample .env.example file and rename it to .env
3. Set up your database connection like the 
    DB_DATABASE=YOUR_DATABASE_NAME
    DB_USERNAME=YOUR_USERNAME
    DB_PASSWORD=YOUR_PASSWORD
4. Then on your command line within the project folder, run `php artisan migrate` to populate your database with the neccessary migrations designed for the project.

## And what exactly is the project sef?
The project is a NET WORTH CALCULATOR which asks some few questions about your Assets (including cash which is specified as others) and as well as your liabilities. The system does a live update of the your NET WORTH and displays the result below the entry.
Laravele is used for the Backend and VueJS as the frontend engine for listening to events and act based on the events.

## Contributors
Christopher Okokon Ntuk
@devChris
