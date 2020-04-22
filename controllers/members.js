const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

exports.index = function(req, res){
    return res.render("members/index", { members: data.members })
}

exports.register = function(req, res){
    return res.render("members/register")
}

exports.post = function(req, res){
    
    const keys = Object.keys(req.body) 

    for (key of keys) { 
       if (req.body[key] == "") {
           return res.send('Please, fill out all fields')
       }
    }

    birth = Date.parse(req.body.birth)        
    
    let id = 1;
    const lastMember = data.members[data.members.length - 1]

    if (lastMember) {
        id = lastMember.id + 1
    }
    
    data.members.push({ 
        ...req.body,
        id, 
        birth, 
    }) 

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){ 
        if (err) return res.send("Write file error")

        return res.redirect(`/members/${id}`)
    })
}

exports.show = function(req, res){
    const { id } = req.params
    const foundMember = data.members.find(function(member){
        return id == member.id
    })
    if (!foundMember) return res.send("member not found")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render("members/show", { member })
}

exports.edit = function(req, res){  
    const { id } = req.params

    const foundMember = data.members.find(function(member){    // <Procurando instrutor>
        return id == member.id
    })

    if (!foundMember) return res.send("member not found")          // </Procurando instrutor>

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso,
        id: Number(foundMember.id)
    }

    return res.render("members/edit", { member })
}

exports.put = function(req, res){
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function(member, foundIndex){
        if (member.id == id) { 
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("member not found")   
    
    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }   

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write Files Error")

        return res.redirect(`/members/${id}`)
    })

}

exports.delete = function(req, res){
    const { id } = req.body

    const filteredmembers = data.members.filter(function(member){
        return member.id != id 
    })

    data.members = filteredmembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Delete Error")

        return res.redirect("/members")
    })
}