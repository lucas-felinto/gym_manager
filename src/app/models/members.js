const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM members ORDER BY name ASC`, function (err, results) {
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
                instructor_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `
        const values = [
            data.avatar,
            data.name,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor
        ]

        db.query(query, values, function (err, results){
            if (err) throw `Database ERROR ${err}`

            callback(results.rows[0])
        })

    }, 
    find(id, callback) {
        db.query(`
        SELECT members.*, instructors.name AS instructor_name
        FROM members
        LEFT JOIN instructors ON (members.instructor_id = instructors.id)
        WHERE members.id = $1`, [id], function(err, results) {
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
                instructor_id = ($8)
            WHERE id = $9
        `
        const values = [
            data.avatar,
            data.name,
            data.email,
            date(data.birth).iso,
            data.blood,
            data.weight,
            data.height,
            data.instructor,
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
    },
    instructorsSelectOptions(callback) {
        db.query(` SELECT name, id FROM instructors `, function (err, results) {
            if (err) throw `Database ERROR `

            callback(results.rows)
        })
    },
    paginate(params) {
        const { filter, limit, offset, callback } = params

        let query = "",
            filterQuery = "",
            totalQuery = `(SELECT count(*) FROM members) AS total` 

        if (filter) {
            filterQuery = `
            WHERE members.name ILIKE '%${filter}%'
            OR members.email ILIKE '%${filter}%'
            `

            totalQuery = `(
                SELECT count(*) FROM members
                ${filterQuery}
            ) AS total`

        }

        query = ` 
        SELECT members.*,
        ${totalQuery}
        FROM members
        ${filterQuery}
        LIMIT $1 OFFSET $2
        `

        db.query(query, [limit, offset], function (err, results) {
            if (err) throw "Data base ERROR"

            callback(results.rows)
        })

    }
}