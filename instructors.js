const fs = require('fs')
const data = require('./data.json')

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

//show //REVISTAR ISSO DAQUI - COMPARAR COM O FOODFY/PORTFOLIO
exports.show = function(req, res){
    const { id } = req.params
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id //encontrando instrutor
    })
    if (!foundInstructor) return res.send("Instructor not found")

    return res.render("instructors/show", {instructor: foundInstructor })
}