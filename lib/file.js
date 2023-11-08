const fs = require('fs')
const path = require('path')

const getAbsolutePath = (pathValidate) => { //pathValidate representa una ruta de archivo o directorio que se desea verificar
    let convertPath = pathValidate // almacenamos la ruta de archivo o directorio que se está evaluando.
    if (!path.isAbsolute(pathValidate)) { //libreria node path.d.ts: .isAbsolute Determina si {ruta} es una ruta absoluta. 
        console.log('The rout is relative') // se imprime el resultado de if
        convertPath = path.resolve(pathValidate) // si la respuesta fue false, convertimos la ruta a absoluta
        // .resolve() retorna un objeto Promise que es resuelto con el valor dado.
    }
    console.log('The rout is absolute:' + convertPath)

    return convertPath 
}
// console.log(isAbsolutePath('/Users/Regina/Documents/MdLinks/DEV010-md-links/example/README.md'))

const fileExists = (pathValidate) => { // función  para verificar si un archivo o ruta dada existe en el sistema de archivos.
    return new Promise((resolve, reject) => { // La promesa se utiliza para manejar de manera asincrónica el proceso de verificación.
        fs.access(pathValidate, fs.constants.F_OK, (err) => { // se utiliza la función fs.access (del módulo fs) para verificar si el archivo especificado en pathValidate existe. 
            // se pasa como primer argumento pathValidate para verificar la existencia del archivo
            // con fs.constants.F_OK indicamos que queremos verificar la existencia del archivo
            // Si el archivo existe, err será null
            if (err) {
                reject(new Error('The path does not exist'))
            } else {
                resolve(true)
            }
        })
    })
}

function getLinksFromFile(file) {
    return new Promise((resolve, reject) => {
        const links = []
        fs.readFile(file, "utf-8", (error, res) => {
            if (error) {
                reject(error);
            }
            const regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\((https:\/\/[^\)]+)\))/gi
            const links = [...res.matchAll(regex)].map((item) => ({ text: item[1], href: item[2]}))
            resolve(links)
        })
    });
}

const isMarkdown = (pathValidate) => {
    // Verificamos la extension del archivo
    const extension = path.extname(pathValidate)
    console.log('The file extension is:', extension)
    const mdExtensions = [
        '.md',
        '.mkd',
        '.mdwn',
        '.mdown',
        '.mdtxt',
        '.mdtext',
        '.markdown',
        '.text',
    ]
    return mdExtensions.includes(extension) // .includes() determina si una matriz incluye un determinado elemento, devuelve true o false según corresponda.

}

module.exports = {
    fileExists,
    getAbsolutePath,
    isMarkdown,
    getLinksFromFile,
}