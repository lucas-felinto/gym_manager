const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(
            `SELECT instructors.*, count(members) AS total_students
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            GROUP BY instructors.id 
            ORDER BY total_students DESC`, function (err, results) {
            if (err) throw `Database ERROR ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {

        const query = `
            INSERT INTO instructors (
                avatar,
                name,
                birth,
                modalities,
                period,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
        const values = [
            data.avatar,
            data.name,
            date(data.birth).iso,
            data.modalities,
            data.period,
            date(Date.now()).iso
        ]

        db.query(query, values, function (err, results){
            if (err) throw `Database ERROR ${err}`

            callback(results.rows[0])
        })

    }, 
    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database ERROR ${err}`
            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(
            `SELECT instructors.*, count(members) AS total_students
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            WHERE instructors.name ILIKE '%${filter}%'
            OR instructors.modalities ILIKE '%${filter}%'
            OR instructors.period ILIKE '%${filter}%'
            GROUP BY instructors.id 
            ORDER BY total_students DESC`, function (err, results) {
            if (err) throw `Database ERROR ${err}`

            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE instructors SET
                avatar = ($1),
                name = ($2),
                birth = ($3),
                modalities = ($4),
                period = ($5)
            WHERE id = $6
        `
        const values = [
            data.avatar,
            data.name,
            date(data.birth).iso,
            data.modalities,
            data.period,
            data.id
        ]

        db.query(query, values, function(err) {
            if (err) throw `Database ERROR ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], function(err) {
            if (err) throw `Database ERROR ${err}`

            return callback()
        })
    }
}