#### Running local development environment
Go to the server folder install dependencies for backend:

```
npm install
```
Run the application:
```
npm start
```

Note: make sure that mongo db is up and running on your machines.


## API endpoints
This table contains the endpoints the API supports:

URL | Method | Data example | Description | Query parameters | Response codes
--- | --- | --- | --- | --- | ---
/ | GET | | ping endpoint | | 200 - OK
/login/ | POST | { email: "test@mail.com", password: "password" } | authenticate user | | 200 - Login Sucessfull, 401 - Authentication failed
/category/get | GET | | list all categories |  | 200 - Returns list of categories
/category/post | POST | | add new category | | 201 - Category added successfully, 400 - Please fill category, 403 - category alredy exist
/dish/get/ | GET |  | get all dishes according to selected category  | | 
/dish/post/ | POST | | add new dish | | 201 - Dish added successfully, 403 - dish alredy exist
/api-docs/ | Best to use this endpoit here you will get all data in swagger ui.
