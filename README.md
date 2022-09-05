# Wikipedia-RESTful-API

A Wikipedia RESTful API built using Node.js, Express.js, mongoDB

# How to set this up on your local Machine

* Clone/Download zip
* Add your mongoDB cluster url in app.js file 
* `node app.js` to start the server

# API Endpoints

## Access all the Articles

Make a GET request on the following url

`https://<yourdomain>/articles`

## Access a particular Article

Make a GET request on the following url

`https://<yourdomain>/articles/<articleTitle>`

## Add a new Article

Make a POST request on the following url with `title` and `content` field

`https://<yourdomain>/articles/<articleTitle>`

## Update/Replace a particular Article

Make a PUT request on the following url with `title` and `content` field

`https://<yourdomain>/articles/<articleTitle>`

## Update a particular field of Article

Make a PATCH request on the following url with `title` or `content` field

`https://<yourdomain>/articles/<articleTitle>`

## Delete a particular Article

Make a DELETE request on the following url

`https://<yourdomain>/articles/<articleTitle>`


## Delete all the Articles

Make a DELETE request on the following url

`https://<yourdomain>/articles`
