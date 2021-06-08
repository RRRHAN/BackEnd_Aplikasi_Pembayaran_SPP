const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const md5 = require("md5")
const SECRET_KEY = "apa_hayo"

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.post("/petugas", async(req, res) => {
    let petugas = require("../models/index").petugas
    let params = {
        username: req.body.username,
        password: md5(req.body.password),
    }

    let result = await petugas.findOne({ where: params })
    if (result) {
        let payload = JSON.stringify(result)
            // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token,
        })
    } else {
        res.json({
            logged: false,
            message: "Invalid username or password",
        })
    }
})

app.post("/siswa", async(req, res) => {
    let siswa = require("../models/index").siswa

    let params = {
        nisn: req.body.nisn,
    }

    let result = await siswa.findOne({ where: params })
    if (result) {
        let data = { result, level: "siswa" }
        console.log(data)
        let payload = JSON.stringify(data)
            // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: data,
            token: token,
        })
    } else {
        res.json({
            logged: false,
            message: "Invalid NISN",
        })
    }
})

module.exports = app