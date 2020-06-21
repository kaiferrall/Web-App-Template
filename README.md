#Web Application Template

<h3>Purpose</h3>
- To avoid redoing all the tedious features of a standard web application.
- To be as generally applicable as possible while still having meaningful features.

<h3>Features (backend)</h3>
- A RESTFUL JSON api.
- MongoDB database.
- api is secured with JSON Webtokens.
- A base user database model with hashed passwords and email verification functionality.
- Password hashing/reseting via email.
- User database caching with Redis (can easily be disabled).
- and more ...

<h3>Features (client)</h3>
- A react application with full login and user registration functionality.
- Redux for application wide authentication state via the api.
- Generic component loading for an interactive and native feel to the application.
- and more ...


#Get Started

<h3>Development</h3>
- clone repository
- npm install in app/ and app/client
- add a config/keys.js in app/
- to connect database set databaseURI field in config/keys.js
- if using redis add redis port in the userCache.js
- run npm start in app/client and node server.js in app/
