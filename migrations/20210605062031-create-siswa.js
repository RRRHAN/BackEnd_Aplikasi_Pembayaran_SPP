"use strict"
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable("siswa", {
            nisn: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.STRING,
            },
            nis: {
                type: Sequelize.STRING,
            },
            nama: {
                type: Sequelize.STRING,
            },
            id_kelas: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "kelas",
                    key: "id_kelas",
                },
            },
            alamat: {
                type: Sequelize.TEXT,
            },
            no_telp: {
                type: Sequelize.STRING,
            },
            id_spp: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "spp",
                    key: "id_spp",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable("siswa")
    },
}