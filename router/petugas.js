const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const petugas = models.petugas

const md5 = require("md5")

const auth = require("../auth")
app.use(auth("admin"))

app.get("/", async(req, res) => {
    let result = await petugas.findAll()
    res.json(result)
})

app.get("/:id_petugas", async(req, res) => {
    let param = { id_petugas: req.params.id_petugas }
    let result = await petugas.findOne({ where: param })
    res.json(result)
})

app.post("/", async(req, res) => {
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level,
    }

    petugas
        .create(data)
        .then((result) => {
            res.json({
                message: "data has been inserted",
                data: result,
            })
        })
        .catch((error) => {
            res.json({
                message: error.message,
            })
        })
})

app.put("/", async(req, res) => {
    let param = { id_petugas: req.body.id_petugas }
    let data = {
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level,
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    petugas
        .update(data, { where: param })
        .then((result) => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch((error) => {
            res.json({
                message: error.message,
            })
        })
})

app.delete("/:id_petugas", async(req, res) => {
    let param = { id_petugas: req.params.id_petugas }
    petugas
        .destroy({ where: param })
        .then((result) => {
            res.json({
                message: "data has been deleted",
            })
        })
        .catch((error) => {
            res.json({
                message: error.message,
            })
        })
})

module.exports = app