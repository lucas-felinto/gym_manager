const express = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')

//HOME
routes.get("/", function(req, res){
    return res.redirect("/home")
})
routes.get("/home", function (req, res){
    return res.render("home")
})

//INSTRUCTORS
routes.get("/instructors", instructors.index)
routes.get("/instructors/register", instructors.register)
routes.get("/instructors/:id", instructors.show)
routes.get("/instructors/:id/edit", instructors.edit)
routes.post("/instructors", instructors.post)
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)

//MEMBERS
routes.get("/members", members.index)
routes.get("/members/register", members.register)
routes.get("/members/:id", members.show)
routes.get("/members/:id/edit", members.edit)
routes.post("/members", members.post)
routes.put("/members", members.put)
routes.delete("/members", members.delete)

module.exports = routes