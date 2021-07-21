var jwt = require('jsonwebtoken')
var keys = require('../auth/tokens')

module.exports = (req, res, next) => {
    console.log(req.header('authorization'))
    if (!req.header('authorization')) {
        return res.json({ "message": "خطای احراز هویت" })
    } else {
        try {
            var verify = jwt.verify(req.header('authorization'), keys.keys)
            next()
        } catch (err) {
            res.json(err)
        }
    }
}