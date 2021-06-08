const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const spp = models.spp

const auth = require("../auth")
app.use(auth("admin"))

app.get("/", async(req, res) => {
    let result = await spp.findAll()
    res.json(result)
})

app.get("/:id_spp", async(req, res) => {
    let param = { id_spp: req.params.id_spp }
    let result = await spp.findOne({ where: param })
    res.json(result)
})

app.post("/", async(req, res) => {
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal,
    }

    spp
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
    let param = { id_spp: req.body.id_spp }
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal,
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    spp
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

app.delete("/:id_spp", async(req, res) => {
    let param = { id_spp: req.params.id_spp }
    spp
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