const express = require("express")
const app = express()
const cors = require("cors")
const base_url = "/payment/api/v1"
app.use(cors())

const petugas = require("./router/petugas")
app.use(`${base_url}/petugas`, petugas)

const kelas = require("./router/kelas")
app.use(base_url + "/kelas", kelas)

const siswa = require("./router/siswa")
app.use(`${base_url}/siswa`, siswa)

const spp = require("./router/spp")
app.use(`${base_url}/spp`, spp)

const pembayaran = require("./router/pembayaran")
app.use(`${base_url}/pembayaran`, pembayaran)

const login = require("./router/login")
app.use(`${base_url}/login`, login)

const bayar = require("./router/bayar")
app.use(`${base_url}/bayar`, bayar)

const history = require("./router/history")
app.use(`${base_url}/history`, history)

const port = 9090
app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})