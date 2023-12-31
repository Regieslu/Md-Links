const { isUrlValid, makingGetCall } = require('./lib/app.js')
const { getAbsolutePath, fileExists, isMarkdown, getLinksFromFile } = require('./lib/file.js')

const mdLinks = (pathValidate) => {
    const absolutePath = getAbsolutePath(pathValidate)
    fileExists(absolutePath)
        .then(((res) => {
            console.log('The file exists: ' + res)
            if (isMarkdown(absolutePath)) {
                getLinksFromFile(absolutePath)
                    .then((items) => {
                        items.forEach((item) => {
                            if(isUrlValid(item.href)) {
                                makingGetCall(item, absolutePath) //aqui pasamos item como todo el object.
                                .then((response) => {
                                    console.table(response)
                                })
                                .catch((e) => console.table(e))
                            }
                        });

                    })
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
// Ejemplo de uso con README de laboratoria:
mdLinks('./README.md')

module.exports = mdLinks
