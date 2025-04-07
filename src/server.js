const express = require('express')
const multer = require('multer')
const fs = require('fs')
const { error } = require('console')

const app = express()

app.post("/upload", function (req, res) {

    const storage = multer.diskStorage({
        destination: function (req, file, callback){
        callback(null, `${__dirname}/saveImage` )
        },
        filename: function(req, file, callback) {
            callback(null, Date.now() + ".jpg")
        }
    })

    const upload = multer ({ storage}).single("file");

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError){
            return res.status(500).send(err);
        }else if (err) {
            return res.status(500).send(err);
        }

        return res.status(200).send({message: "upload feito com sucesso"})

    })

})

app.listen(6000, () => {
    console.log("API, rodando na porta 6000")
})
