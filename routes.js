const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')


//THE GENERIC ROUTE:
// app.METHOD.(PATH, HANDLER)
// where - app: express instance; METHOD = HTTP solicitation method (get, post, put, delet); PATH = the way or direction and the HANDLER is the function

routes.get("/", function(req, res){ //respond = redirect to /instructores when GET the homemade request
    return res.redirect("/instructors")
})

routes.get("/instructors", function(req, res){ //respond = render the static file index when GET the client requires
    return res.render("instructors/index")
})

routes.get("/instructors/register", function(req, res){
    return res.render("instructors/register")
})

routes.post("/instructors", instructors.post) //respond the instructors.js function when the client POST

routes.get("/instructors/:id", instructors.show) //em routes: const { id } = req.params

routes.get("/members", function(req, res) { 
    return res.render("members") 
}) 

module.exports = routes //exports this file to the server