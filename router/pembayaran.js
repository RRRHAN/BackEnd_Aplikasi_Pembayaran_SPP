const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const pembayaran = models.pembayaran

const auth = require("../auth")
app.use(auth("admin"))

app.get("/", async(req, res) => {
    let result = await pembayaran.findAll()
    res.json(result)
})

app.get("/:id_pembayaran", async(req, res) => {
    let param = { id_pembayaran: req.params.id_pembayaran }
    let result = await pembayaran.findOne({ where: param })
    res.json(result)
})

app.post("/", async(req, res) => {
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: req.body.tgl_bayar,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar,
    }

    pembayaran
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
    let param = { id_pembayaran: req.body.id_pembayaran }
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: req.body.tgl_bayar,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar,
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    pembayaran
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

app.delete("/:id_pembayaran", async(req, res) => {
    let param = { id_pembayaran: req.params.id_pembayaran }
    pembayaran
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