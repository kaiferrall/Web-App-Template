<h1>Web Application Template</h1>
<hr />

<h3>Purpose</h3>
<ul>
  <li>To avoid redoing all the tedious features of a standard web application.</li>
  <li>To be as generally applicable as possible while still having meaningful features.</li>
</ul>

<h3>Features (backend)</h3>
<ul>
  <li>A RESTFUL JSON api.</li>
  <li>MongoDB database.</li>
  <li>api is secured with JSON Webtokens.</li>
  <li>A base user database model with hashed passwords and email verification functionality.</li>
  <li>Password hashing/reseting via email.</li>
  <li>User database caching with Redis (can easily be disabled).</li>
  <li>and more ...</li>
</ul>

<h3>Features (client)</h3>
<ul>
  <li>A react application with full login and user registration functionality.</li>
  <li>Redux for application wide authentication state via the api.</li>
  <li>Generic component loading for an interactive and native feel to the application.</li>
  <li>and more ...</li>
</ul>


<h1>Get Started</h1>
<hr />

<h3>Development</h3>
<ul>
  <li>clone repository</li>
  <li>npm install in app/ and app/client</li>
  <li>add a config/keys.js in app/</li>
  <li>to connect database set databaseURI field in config/keys.js</li>
  <li>if using redis add redis port in the userCache.js</li>
  <li>run npm start in app/client and node server.js in app/</li>
</ul>
