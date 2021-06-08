const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const siswa = models.siswa

const auth = require("../auth")
app.use(auth("admin"))

app.get("/", async(req, res) => {
    let result = await siswa.findAll()
    res.json(result)
})

app.get("/:nisn", async(req, res) => {
    let param = { nisn: req.params.nisn }
    let result = await siswa.findOne({ where: param })
    res.json(result)
})

app.post("/", async(req, res) => {
    let data = {
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
    }

    siswa
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
    let param = { nisn: req.body.nisn }
    let data = {
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        id_spp: req.body.id_spp,
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    siswa
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

app.delete("/:nisn", async(req, res) => {
    let param = { nisn: req.params.nisn }
    siswa
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