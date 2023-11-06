const { isUrlValid, makingGetCall } = require('./lib/app.js')
const { getAbsolutePath, fileExists, isMarkdown, readFile } = require('./lib/file.js')
let fs = require('fs'), //fs es una librería que tiene métodos para abrir el archivo y leer su contenido
    readline = require('readline')
const { response } = require('express')

const mdLinks = (pathValidate) => {
    const absolutePath = getAbsolutePath(pathValidate)
    fileExists(absolutePath)
        .then(((res) => {
            console.log('The file exists: ' + res)
            if (isMarkdown(absolutePath)) {
                readFile(absolutePath)
                    .then((links) => {
                        links.array.forEach((link) => {
                            makingGetCall(link.href)
                                .then((response) => {
                                    console.log(response)
                                })
                                .catch((e) => console.log(e))

                        });

                    })
                // const reader = readline.createInterface({ // mi variable reader va a leer el archivo que quiero que lea. 
                //     input: fs.createReadStream(absolutePath) // COMO CACHAR AQUI SI UN USUARIO METE UN ARCHIVO?????????????
                // })
                // reader.on('line', function (line) { //el reader.on da marcha a la lectura linea por linea de mi archivo
                //     const isUrl = isUrlValid(line) //aqui valido que la linea sea una URL valida 
                //     if (isUrl) {
                //         makingGetCall(line).then((response) => { console.log(response) })
                //             .catch((e) => console.log(e))
                //         // validUrls.push(line) // la agrega la linea que acaba de leer si es una url VALIDA. 
                //     }
                // })
                // llamas la funcion readfile, le pasas el archivo real. la funcion readfile te regresa los links como array cuando se resuelve
                // a ese array en el then le tienes que hacer un for each, a cada link lo vas a validar y si es valido mandas llamar makingGetCall
            }
        }))
        .catch((error) => {
            if (error.message) {
                console.log(error.message)
            } else {
                console.log('Something went wrong')
            }
        })
}
// Ejemplo de uso:
mdLinks('./example/README.md')

module.exports = mdLinks
