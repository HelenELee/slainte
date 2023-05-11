
  # [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  # Slainte

  ## Table of Contents
 - [Description](#description)
 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Test Instructions](#test-instructions)
 - [Credits](#credits)
 - [Questions](#questions)
  
  ## Description
  This is a tracking and motivational application specifically designed to track the activities a user does that will improve their mental and physical health. It’s a tool that will actually raise awareness of the connection between how we show up every day and how well we look after ourselves. By tracking activities in 4 categories – food, exercise, mind, connection with others, the user will begin to see a trend which over time will encourage good choices for better health outcomes.
  
  After setting up an account the user can CREATE an entry by completing a form daily. Data input by the user is fed into charts for easy visulation of the trends. Daily data can be READ in a Calendar format and from there the user can UPDATE and DELETE the data. The user is provided with suggestions for improvements based on their data and also inspirational quotes.

  This is a full stack applicaton following the MERN framework. MongoDB and Mongoose are used for data storage. GraphQL, Apollo, Express and Node.js are used on the server side for routing GraphQL queries and mutations. Authentication is done using JSON Web Token. Styling is done using Styled-Components.
  
  The application is developed using the following technologies:
  - Javascript
  - CSS
  - HTML
  - React
  - Node.js
  - Express.js
  - GraphQl
  - Apollo
  - MongoDB
  - Mongoose
  - Axios
  - JSON Web Token
  - Styled-Components
  - ReCharts
  - FullCalendar
  - Font Awesome
  - JS-Confetti
  - Date-fns
  - Bcrypt

  One of the main challenges in developing this application was familiarisation with GraphQL.


  ## Installation
  Ensure node is installed. Test by running 
  ```
  node -v
  ```

  To install this package run:
  ```
  npm install
  ```

  ## Usage
  To run this application ensure you are in the main me-time directory. 
  
  To seed the database run :
``` 
npm run seed
```

  To start the client and server run:
```
npm run develop
```
You should see the client/server startup message:

![Here is a screenshot showing the server started.](/client/src/images/server.jpg)

Once the server is running you can open your browser and enter:
```
http://localhost:3000/

```
You will be presented with the landing page with options for sign up/login:

![Here is a screenshot showing the login page.](/client/src/images/landing.jpg)

To create an account, click the "Sign up" button. Enter your details and click "Submit". Once logged in you will see more options on the nav bar:

![Here is a screenshot showing the navbar.](/client/src/images/navbar.jpg)

To complete an activity form click "Add Activities" in the nav bar. Hovering over the activity cards will flip them so activities can be chosen. Once the card flips back the number of activites chosen is displayed. A Submit button is displayed. If an existing actvity form is opened from the Calendar screen the Delete option will also appear.

![Here is a screenshot showing the activity form.](/client/src/images/activity.jpg)

To view charts, suggestions and quotes click the "Dashboard" option from the navbar:

![Here is a screenshot showing the activity form.](/client/src/images/dashboard.jpg)

All activities can be viewed in a Calendar format by selecting "All Activities" from the nav bar. Days are colour coded based on how the user rated the day.

![Here is a screenshot showing the activity form.](/client/src/images/calendar.jpg)

When you are finished, click "Logout" to logout.

To try out the working application please click the link below:
[Slainte](https://guarded-everglades-34887.herokuapp.com/)

  ## License
  This project is covered by the "The MIT License" license.
  For more details click on the link below:
  [License](https://opensource.org/licenses/MIT)
  
  
  ## Test Instructions
  The application can be tested by following the instructions above under the Usage section.


  ## Credits
  I would like to thank the instructors at UWA Bootcamp. 
  
  ## How to Contribute
This repository is not open for public contribution.

  
