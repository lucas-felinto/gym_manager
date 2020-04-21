const express = require('express') 
const nunjucks = require('nunjucks') 
const routes = require("./routes")
const methodOverride = require('method-override')

const server = express() 


// Middlewares
server.use(express.urlencoded({ extended: true })) 
server.use(express.static('public')) 
server.use(routes)
server.use(methodOverride('_method'))

server.set("view engine", "njk") 

nunjucks.configure("views", { 
    express: server,
    noCache: true,
    autoescape: false
})

server.listen(5000, function (){
    console.log('server is running')
})