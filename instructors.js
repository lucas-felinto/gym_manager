const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

// create 
exports.post = function(req, res){
    
    const keys = Object.keys(req.body) //req.body holds parameters that are sent up from the client as part of a POST request. 

    for (key of keys) { //keys = all the input fields          // Validação dos Dados
       if (req.body[key] == "") {
           return res.send('Please, fill out all fields')
       }
    }

    let { avatar, name, birth, modalities, period } = req.body // Desetruturação dos Dados

    birth = Date.parse(req.body.birth)                         // Tratamento dos Dados
    created_at = Date.now()
    id = Number(data.instructors + 1)
    
    data.instructors.push({ //Enviando para data.instructors:  //Organizando Dados
        id,
        avatar,
        name,
        birth,
        modalities,
        period,
        created_at
    }) 

//Recebendo e armazenando os dados
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) return res.send("Write file error")

        return res.redirect("/instructors")
    })
}

//show
exports.show = function(req, res){
    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id //encontrando instrutor
    })
    if (!foundInstructor) return res.send("Instructor not found")

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        modalities: foundInstructor.modalities.split(","),
        period: foundInstructor.period.split(","),
        created_at: new Intl.DateTimeFormat("en-GB").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", { instructor })
}

//edit
exports.edit = function(req, res){  
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){    // <Procurando instrutor>
    return instructor.id == id

})
    if (!foundInstructor) return res.send("Instructor not found")          // </Procurando instrutor>

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render("instructors/edit", { instructor })
}

//put
// salvar alterações no Back End
exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if (instructor.id == id) { 
            index = foundIndex
            return true
        }

})
    if (!foundInstructor) return res.send("Instructor not found")

    const intructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }   

    data.instructors[index] = instructor
    fs.writeFile("data.json", JSON.stringify(data, null, 2)), function(err) {
        
        return res.redirect(`/instructor/${id}`)
    }

}

