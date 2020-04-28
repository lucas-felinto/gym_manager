const { age, date } = require('../../lib/utils')

module.exports = {
    index (req, res) {
    return res.render("instructors/index", { instructors: data.instructors })
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
        return res.redirect("/instructors")
    },
    show (req, res) {
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
    },
    edit (req, res) {
        return
    },
    put (req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) { 
        if (req.body[key] == "") {
            return res.send('Please, fill out all fields')
        }
    }
        return res.redirect("/instructors")
    },
    delete (req, res) {
        return
    }
}