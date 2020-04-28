const { age, date } = require('../../lib/utils')

module.exports = {
    index (req, res) {
    return res.render("members/index")
    },
    register (req, res) {
    return res.render("members/register")
    },
    post (req, res) {
        const keys = Object.keys(req.body)

        for (key of keys) { 
        if (req.body[key] == "") {
            return res.send('Please, fill out all fields')
        }
    }
        return res.redirect("/members")
    },
    show (req, res) {
        const { id } = req.params
        const foundMember = data.members.find(function(member){
        return id == member.id
    })
    if (!foundMember) return res.send("member not found")

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
        modalities: foundMember.modalities.split(","),
        created_at: new Intl.DateTimeFormat("en-GB").format(foundMember.created_at)
    }

    return res.render("members/show")
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
        return res.redirect("/members")
    },
    delete (req, res) {
        return
    }
}