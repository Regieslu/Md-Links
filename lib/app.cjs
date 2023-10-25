var fs = require('fs'), //fs es una librería que tiene métodos para abrir el archivo y leer su contenido
    readline = require('readline')
const axios = require('axios') //axios es una libreria para poder hacer llamadas HTTP

const reader = readline.createInterface({ //mi variable reader va a leer el archivo que quiero que lea. 
    input: fs.createReadStream('../example/README.md') //COMO CACHAR AQUI SI UN USUARIO METE UN ARCHIVO?????????????
})

reader.on('line', function (line) { //el reader.on da marcha a la lectura linea por linea de mi archivo
    const isUrl = isUrlValid(line) //aqui valido que la linea sea una URL valida
    let validUrls = [] //aqui creo un array que guardara las URL validas que encuentre en el archivo. 
    if (isUrl) {
        validUrls.push(line) // la agrega la linea que acaba de leer si es una url VALIDA. 
    }
    if (validUrls.length) { //si el array no está vacío, le mando el array a la funcion que hará la llamada GET, (validateLinks)
        makingGetCall(validUrls).then((res) => console.log(res))
    }
})

function isUrlValid(str) { //este es mi funcion de regex de validacion de URL que me retorna true or false segun sea el caso. 
    const pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    )
    return pattern.test(str)
}

const makingGetCall = (urls) => new Promise((resolve, reject) => { //a la funcion makingGetCall, le paso un array de URLS
    const arrayProms = urls.map((url) => axios.get(url) //con anxios.get hago la llamada GET a la URL . Esto guarda un array de promesas
        .then((response) => { //Si la respuesta es exitosa, construyo un object que contiene mi url y su estatus.code. ESTE 
            //OBJETO ES EL QUE RETORNO EN LA LINEA 16 pero hasta que la funcion promise.all termine. 
            return {
                url,
                status: response.status,
            }
        })
        .catch((error) => { // si ese error regresa un objeto pero con status error
            let statusCode = 500
            if (error.response) {
                statusCode = error.response.status
            }
            return {
                url,
                status: statusCode,
            }
        }))

    Promise.all(arrayProms) //una vez que las promesas se resuelven (resolve or regect),
        // a promise.all le paso el array de todas las promesas y promise.all me regresa una ùnica promesa .
        //  Esta promesa devuelta se cumple cuando se cumplen todas las promesas de entrada, de lo contrario es rejected.
        .then((data) => {
            resolve(data)
        })
        .catch(() => {
            reject(new Error('something went wrong'))
        })
})
module.exports = {
    makingGetCall,
    isUrlValid,
}