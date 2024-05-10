# CLUB

## Code Structure

```
ProjectCode/
    client/front-end/ # Directory to run `npm run dev` from
        src/
            main.jsx       # Wrapper for App class
            App.jsx        # Contains logic for user authentication & route navigation
            assets/        # This directory contains all the images & videos used in the app
            components/    # Partial views, modals, and navbar        
            context/       # AuthContext across application
            css/           # Stylized views and components
            views/         # Active webpages, accessed via navigation or app routing 
    server/
        sql/
            ...    # DB Schema to be ran before booting up application
        src/main/java/learn/club/
            App.java    # The first file to be executed when launching the app.
            controllers/    # Rest Controllers used for API requests
            data/           # JdbcTemplate running SQL queries from MySQL DB connection
            domain/         # Service layer
            models/         # Classes inheriting data from backend
            security/       # Spring Security utilizing user authentication (JWT)
```

## How to run the app

### Running the app for development purposes

Steps to setup and run the frontend of the application:
1. Download NodeJS at https://nodejs.org/en/download/
2. In a terminal, run `npm install bulma`
3. In a terminal, run `npm install primereact`
4. In a terminal, run `npm install hamburger-react`
5. In a terminal, run `npm install react-router-dom`
6. Download/clone a local version of this repository and navigate to the `client/front-end` directory in a terminal
7. Run `npm run dev`

Steps to run the backend of the application:
1. In IntelliJ, open the server Maven project
2. Instantiate `DB_USERNAME` & `DB_PASSWORD` environment variables
3. Execute App class
