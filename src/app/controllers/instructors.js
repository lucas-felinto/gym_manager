const { age, date } = require('../../lib/utils')
const Instructor = require('../models/instructors')

module.exports = {
    index (req, res) {
        const { filter } = req.query

        if (filter) {
            Instructor.findBy(filter, function(instructors){
            return res.render("instructors/index", { instructors, filter })
            })
        } else {
            Instructor.all(function(instructors) {
            return res.render("instructors/index", { instructors })
            })
        }
    },
    register (req, res) {
    return res.render("instructors/register")
    },
    post (req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) { 
        if (req.body[key] == "") {
            return res.send('Please, fill out all fields')
        }
    }
    
    Instructor.create(req.body, function(instructor){
        return res.redirect(`/instructors/${instructor.id}`)
    })
        
    },
    show (req, res) {
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor Not Found")
            
            instructor.age = age(instructor.birth)
            instructor.modalities = instructor.modalities.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/show", { instructor })
        })

    },
    edit (req, res) {
        Instructor.find(req.params.id, function(instructor) {
            if (!instructor) return res.send("Instructor Not Found")
            
            instructor.birth = date(instructor.birth).iso
            instructor.modalities = instructor.modalities.split(",")
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/edit", { instructor })
        })
    },
    put (req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) { 
        if (req.body[key] == "") {
            return res.send('Please, fill out all fields')
        }
    }

        Instructor.update(req.body, function() {
            return res.redirect(`/instructors/${req.body.id}`)
        })

    },
    delete (req, res) {
        Instructor.delete(req.body.id, function() {
            return res.redirect(`/instructors`)
        })
    }
}