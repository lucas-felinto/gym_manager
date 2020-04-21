const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')


//THE GENERIC ROUTE:
// app.METHOD.(PATH, HANDLER)
// where - app: express instance; METHOD = HTTP solicitation method (get, post, put, delet); PATH = the way or direction and the HANDLER is the function

routes.get("/", function(req, res){ //respond = redirect to /instructores when GET the homemade request
    return res.redirect("/instructors")
})

routes.get("/instructors", instructors.index)
routes.get("/instructors/register", function(req, res){
    return res.render("instructors/register")
})
routes.post("/instructors", instructors.post)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)
routes.get("/instructors/:id", instructors.show)
routes.get("/instructors/:id/edit", instructors.edit)

routes.get("/members", function(req, res) { 
    return res.render("members") 
}) 

module.exports = routes