const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const pembayaran = models.pembayaran
const siswa = models.siswa

const auth = require("../auth")
app.use(auth("admin", "petugas"))

app.post("/", async(req, res) => {
    let current = new Date().toISOString().split("T")[0]
    let data = {
        id_petugas: req.user.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: current,
        bulan_dibayar: req.body.bulan_dibayar,
        tahun_dibayar: req.body.tahun_dibayar,
        jumlah_bayar: req.body.jumlah_bayar,
    }
    let param = { nisn: data.nisn }
    let result = await siswa.findOne({ where: param })
    if (result) {
        data.id_spp = result.id_spp
    } else {
        res.json({ massage: "nisn tidak terdaftar" })
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

module.exports = app