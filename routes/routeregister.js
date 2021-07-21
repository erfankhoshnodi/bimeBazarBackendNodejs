var express = require('express')
var router = express.Router()
var crypto = require('crypto');
var keys = require('../auth/tokens')
var modelregisters = require('../models/modelregister')
var jwttokens = require('../middlewares/jwttokens')
var jwt = require('jsonwebtoken')



router.post('/api/register', jwttokens,async (req, res) => {
    var hashpassword = crypto.createHash('md5').update(req.body.password).digest('hex')
    // var datas = await modelregisters.find({email:req.body.email})
    var datas = await modelregisters.find({ email: req.body.email })
    if (datas.length == 0) {
        var newuser = new modelregisters({
            fname: req.body.fname,
            lname: req.body.lname,
            // dateOfRegistration: new Date().toLocaleDateString('fa'),
            password: hashpassword,
            email: req.body.email
        })
        newuser.save()
        res.json({ 'message': 'ok' }).status(200)
    } else {
        res.json({ 'message': 'این ایمیل قبلا در سیستم ثبت نام شده است!' }).status(400)
    }
})

router.post('/api/login', async (req, res) => {
    var hashpassword = crypto.createHash('md5').update(req.body.password).digest('hex')
    var temp = await modelregisters.find({ email: req.body.email, password: hashpassword })
    // console.log(temp)
    var data = {
        fname:temp[0].fname,
        lname:temp[0].lname,
        email:temp[0].email
    }
    var mytoken = jwt.sign(data,keys.keys)
    if (temp.length == 0) {
        res.json({ 'message': 'نام کاربری و یا رمز اشتباه می باشد' }).status(301)
    } else {
        res.header("authorization",mytoken).status(200).json(temp[0])
    }
})

router.get('/api/allusers',jwttokens, async (req, res) => {
    if (req.query.email) {
        var allusers = await modelregisters.find({ email: req.query.email })
        if (allusers.length > 0) {
            res.json(allusers)
        } else {
            res.json({ "message": "ایمیل اشتباه است!" })
        }
    } else {
        var allusers = await modelregisters.find()
        res.json(allusers)
    }
})

module.exports = router