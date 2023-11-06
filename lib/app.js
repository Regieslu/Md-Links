
const axios = require('axios') //axios es una libreria para poder hacer llamadas HTTP

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

const makingGetCall = (url) => new Promise((resolve, reject) => { //a la funcion makingGetCall, le paso un array de URLS
    axios.get(url) //con anxios.get hago la llamada GET a la URL . Esto guarda un array de promesas
        .then((response) => { //Si la respuesta es exitosa, construyo un object que contiene mi url y su estatus.code. ESTE 
            //OBJETO ES EL QUE RETORNO EN LA LINEA 16 pero hasta que la funcion promise.all termine. 
            resolve({
                url,
                status: response.status,
                ok: 'ok'
            })
        })
        .catch((error) => { // si ese error regresa un objeto pero con status error
            let statusCode = 500
            
            if (error.response) {
                statusCode = error.response.status
            }
            reject({
                url,
                status: statusCode,
                ok: 'fail'
            })
        })
})
module.exports = {
    makingGetCall,
    isUrlValid,
}