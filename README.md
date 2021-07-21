# Planit

### General Info
 **[Plan.It](https://github.com/Kirk-Blue-Ocean/planit "Plan.It")** aims to solve the issue of scheduling events between groups of people with varying schedules.
 
### ✨ Demo
* Axios : Version 0.21.1,
* Babel-jest : Version 27.0.6,
* Babel-plugin-transform-require-ignore : Version 0.1.1,
* Cloudinary : Version 1.26.0,
* Cookie-parser : Version 1.4.5,
* Date-fns : Version 2.22.1m
* Date.js : Version 0.3.3,
* Dotenv : Version 10.0.0,
* Express : Version 4.17.1,
* Express-fileupload : Version 1.2.1m
* Express-form-data : Version 2.0.17,
* Express-session : Version 1.17.2,
* Formik : Version 2.2.9,
* Formik-material-ui : Version 3.0.1,
* Jest : Version 27.0.6,
* Js-cookie : Version 2.2.1,
* Lodash : Version 4.17.21,
* Luxon : Version 2.0.1,
* Mongoose : Version 5.13.2,
* Next : Version 11.0.1,
* Next-transpile-modules : Version 8.0.0,
* Node.js: Version 0.0.1,
* Nodemon: Version 2.0.12,
* Passport: Version 0.4.1,
* Passport-local: Version 1.0.0,
* React : Version 17.0.2,
* React-dom : Version 17.0.2,
* React-hook-form : Version 7.11.0,
* Sass : Version 1.35.2,
* Uuid : Version 8.3.2

### 🧪 Technologies


### 🚀 Installation and Setup
Clone the project and run the following commands:
1. `yarn` to download all of the required dependancies
2. `yarn dev` to deploy the application in development mode

Optionally, the following commands may be useful
- `yarn seed` to populate some sample data into the database

## Running a production build

1. Delete the contents of the `.next/` directory
2. Set `dev` to `false` in `server/app.js`
3. Run the client build:
```
$ yarn client-build
```
3. Run the server
```
$ yarn server
```

### API
------------
##### /api/events
GET - *api/events*
```javascript
options : {
	count: 1,
	where: {
		property: 'name',
		value: 'Tarvent'
	}
}
```
returns
```javascript
updates: {
    name: 'Tarvent',
    description: 'Hey everybody come to my event, it\'s going to be lit! ',
    owner: 'Tarrin',
    location: 'Tarrin\'s house',
  	...
}
```
PUT - */api/events*

```javascript
updates: [
    {
      where: { // previous value to search by
        property: '_id',
        value: '1'
      },
      what: { // new value
        method: '$set', <-- $push add to an array
        field: 'name',
        value: 'Canceled event'
      }
    },
	// ... include additional updates
  ]
```
returns
`200 // - if successful `

POST - */api/events*
```javascript
event: {
 	name: String,
 	description: String,
 	owner: String,
 	location: String,
 	duration: Number,
 	status: String,
 	time: String,
	 window: {
  		 start: String,
  		 end: String,
 	},
 	rsvps: []
}
```
returns `200 // - if successful`


