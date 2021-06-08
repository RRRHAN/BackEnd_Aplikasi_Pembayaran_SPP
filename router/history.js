const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const pembayaran = models.pembayaran

const auth = require("../auth")
app.use(auth("admin", "petugas", "siswa"))

app.get("/", async(req, res) => {
    let result
    if (req.user.level == "siswa") {
        let param = { nisn: req.user.result.nisn }
        console.log(param)
        result = await pembayaran.findAll({ where: param })
    } else {
        result = await pembayaran.findAll()
    }
    res.json(result)
})

module.exports = app