const path = require('path');
const { getAbsolutePath, fileExists, getLinksFromFile, isMarkdown } = require('../lib/file')
const { makingGetCall, isUrlValid } = require('../lib/app')
const fs = require('fs')
// Importa la función que deseas probar (getAbsolutePath)
describe("getAbsolutePath", () => {
    it("Debería retornar la ruta absoluta si la entrada es relativa", () => {
        const relativePath = 'example/README.md'
        const absolutePath = path.resolve(relativePath)
        expect(getAbsolutePath(relativePath)).toBe(absolutePath)
    });

    it("Debería retornar la misma ruta si la entrada ya es absoluta", () => {
        const absolutePath = '/Users/Regina/Documents/MdLinks/DEV010-md-links/example/README.md';
        expect(getAbsolutePath(absolutePath)).toBe(absolutePath);
    });
});

describe("fileExists", () => {
    it("Debería resolver con true si el archivo existe", async () => {
        const existingFilePath = '/Users/Regina/Documents/MdLinks/DEV010-md-links/example/README.md';
        try {
            const result = await fileExists(existingFilePath);
            expect(result).toBe(true);
        } catch (error) {
            // Si la promesa es rechazada inesperadamente, falla la prueba
            fail('La promesa debería haberse resuelto, pero se rechazó inesperadamente.');
        }
    });

    it("Debería rechazar con un error si el archivo no existe", async () => {
        const nonExistingFilePath = 'ruta/inexistente/al/archivo.txt'
        try {
            await fileExists(nonExistingFilePath);
            // Si la promesa se resuelve inesperadamente, falla la prueba
            fail('La promesa debería haberse rechazado, pero se resolvió inesperadamente.');
        } catch (error) {
            // Verifica si el error es del tipo correcto y contiene el mensaje esperado
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe('The path does not exist')
        }
    });
});

describe("getLinksFromFile", () => {
    it("Debería resolver con un array de objetos de enlaces si el archivo existe", async () => {
        const filePath = 'DEV010-md-links/example/README.md'; // Ruta al archivo que contiene enlaces
        const fileContent = 'Texto con enlaces [Markdown](https://es.wikipedia.org/wiki/Markdown) y [Node.js](https://nodejs.org)';
        const expectedLinks = [
            { text: 'Markdown', href: 'https://es.wikipedia.org/wiki/Markdown' },
            { text: 'Node.js', href: 'https://nodejs.org' }
        ];
        // Mockear la función fs.readFile para simular la lectura del archivo
        jest.spyOn(fs, 'readFile').mockImplementation((path, encoding, callback) => {
            callback(null, fileContent);
        });
        const result = await getLinksFromFile(filePath);
        expect(result).toEqual(expectedLinks);
    });
});


describe("makingGetCall", () => {
    it("Debería resolver con un objeto con 'text, 'href', 'statusCode', 'fail 'ok' si la solicitud GET es exitosa y 'file' ", async () => {
        const item =  { text: 'Markdown', href: 'https://es.wikipedia.org/wiki/Markdown' } // URL de ejemplo para una solicitud exitosa
        const result = await makingGetCall(item, "/Users/Regina/Documents/MdLinks/DEV010-md-links/README.md");
        const expectedObject = { text: item.text, href: item.href, statusCode: expect.any(Number), status: 'ok', file: "/Users/Regina/Documents/MdLinks/DEV010-md-links/README.md" }
        expect(result).toEqual(expect.objectContaining(expectedObject))
    });

    it("Debería rechazar con un objeto con 'text, 'href', 'statusCode', 'fail 'ok' y 'file' si la solicitud GET falla", async () => {
        const item =  { text: 'NodeJs', href: 'https://nodejs.org/es/about/' }  // URL de ejemplo que provocará una solicitud fallida
        const expectedObject ={ text: item.text, href: item.href , statusCode: 404, status: 'fail', file: "/Users/Regina/Documents/MdLinks/DEV010-md-links/README.js" }
        try {
            await makingGetCall(expectedObject, '/Users/Regina/Documents/MdLinks/DEV010-md-links/README.js' );
        } catch (error) {
            expect(error).toEqual(expect.objectContaining(expectedObject));
        }
    })
})

describe('isUrlValid', () => {
    it('Debería deolver una url válida', () => {
        const urlCorrecta = 'https://es.wikipedia.org/wiki/Markdown'
        expect(isUrlValid(urlCorrecta)).toBe(true)
    })
    it('Debería deolver una url válida', () => {
        const urlIncorrecta = 'htps://es.ikipedia.org/wiki/'
        expect(isUrlValid(urlIncorrecta)).toBe(false)
    })
})

describe('isMarkdown', () => {
    it ('Debería devolver un archivo markdown', () => {
        const isFileMd = 'README.md'
        expect(isMarkdown(isFileMd)).toBe(true)
    })
    it ('Debería devolver false si no es un archivo markdown', () => {
        const isNotMd = 'REAMDE.ts'
        expect(isMarkdown(isNotMd)).toBe(false)
    })
})

        