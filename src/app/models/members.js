const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM members`, function (err, results) {
            if (err) throw `Database ERROR ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {

        const query = `
            INSERT INTO members (
                avatar,
                name,
                email,
                birth,
                blood,
                weight,
                height,
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [
            data.avatar,
            data.name,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height
        ]

        db.query(query, values, function (err, results){
            if (err) throw `Database ERROR ${err}`

            callback(results.rows[0])
        })

    }, 
    find(id, callback) {
        db.query(`SELECT * FROM members WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database ERROR ${err}`
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE members SET
                avatar = ($1),
                name = ($2),
                email = ($3),
                birth = ($4),
                blood = ($5),
                weight = ($6),
                height = ($7),
            WHERE id = $8
        `
        const values = [
            data.avatar,
            data.name,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database ERROR ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM members WHERE id = $1`, [id], function(err) {
            if (err) throw `Database ERROR ${err}`

            return callback()
        })
    }
}