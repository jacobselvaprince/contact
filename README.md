# The project is for CRUD operation in user collection

# NPM modules used: 
express - The node  framework used.
morgan - To show which api is called from frontend in terminal.
body-parser - The inbuild middleware to convert incoming json data into object.
jsonwebtoken - Used to generate token.
bcrypt - It is used to hash the password.
dotenv - To store securely the critical data.
mongoose - Acts as a front end to MongoDB.

# db/mongoose.js
    The file which contains mongodb connection code.

# middleware/auth.js
    The file which contains authentiction code.

# models/users.js
    The file which contains user schema.

# index.js
    The entry point of the project, which contains all the api's.

# .env
    The file which contains secure data.

# .gitignore
    The file contains the name of the folder or file which is not needed to push into git.

# package.json
    The file which contains all the information about the project.

# API's: 

Url: '/api/login'
Method: POST
Input: email, password(in body).
Output: When email and password are correct, will login successfully and generates token.

Url: '/api/users'
Method: POST
Input:  names{firstName, lastName, middleName},
        email,
        dob,
        phone,
        occupation,
        company,
        password
Output: When the user registered successfully, We will generate token.

Url: '/api/users'
Method: GET
Input:  Need to send token in header.
Output: Will show all the registered users.

Url: '/api/users/:id'
Method: PUT
Input: The field which needs to be modified.
Output: User info will be modified successfully.

Url: '/api/users/:id'
Method: DELETE
Input: The id of the user needs to deleted in params.
Output: User will be deleted successfully.