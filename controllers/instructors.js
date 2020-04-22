const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

exports.index = function(req, res){ //respond = render the static file index when GET the client requires
    return res.render("instructors/index", { instructors: data.instructors })
}

exports.register = function(req, res){
    return res.render("instructors/register")
}
exports.post = function(req, res){
    
    const keys = Object.keys(req.body) //req.body holds parameters that are sent up from the client as part of a POST request. 

    for (key of keys) { //keys = all the input fields          // Validação dos Dados
       if (req.body[key] == "") {
           return res.send('Please, fill out all fields')
       }
    }

    let { id, avatar, name, birth, modalities, period } = req.body // Desetruturação dos Dados

    birth = Date.parse(req.body.birth)                         // Tratamento dos Dados
    created_at = Date.now()
    id = Number(data.instructors.length + 1)
    
    data.instructors.push({ //Enviando para data.instructors:  //Organizando Dados
        id,
        avatar,
        name,
        birth,
        modalities,
        period,
        created_at
    }) 

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) return res.send("Write file error")

        return res.redirect("/instructors")
    })
}

exports.show = function(req, res){
    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor){
        return id == instructor.id
    })
    if (!foundInstructor) return res.send("instructor not found")

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        modalities: foundInstructor.modalities.split(","),
        created_at: new Intl.DateTimeFormat("en-GB").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", { instructor })
}

exports.edit = function(req, res){  
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){    
        return id == instructor.id
    })

    if (!foundInstructor) return res.send("instructor not found")          

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso,
        id: Number(foundInstructor.id)
    }

    return res.render("instructors/edit", { instructor })
}

exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if (instructor.id == id) { 
            index = foundIndex
            return true
        }
    })

    if (!foundInstructor) return res.send("instructor not found")   
    
    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }   

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write Files Error")

        return res.redirect(`/instructors/${id}`)
    })

}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredinstructors = data.instructors.filter(function(instructor){
        return instructor.id != id 
    })

    data.instructors = filteredinstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Delete Error")

        return res.redirect("/instructors")
    })
}