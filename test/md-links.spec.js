const path = require('path');
const { getAbsolutePath, fileExists, getLinksFromFile } = require('../lib/file')
const { makingGetCall } = require('../lib/app')
const fs = require('fs')
// Importa la función que deseas probar (getAbsolutePath)
describe("getAbsolutePath", () => {
    it("Debería retornar la ruta absoluta si la entrada es relativa", () => {
        const relativePath = 'example/README.md';
        const absolutePath = path.resolve(relativePath);
        expect(getAbsolutePath(relativePath)).toBe(absolutePath);
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
        const nonExistingFilePath = 'ruta/inexistente/al/archivo.txt';
        try {
            await fileExists(nonExistingFilePath);
            // Si la promesa se resuelve inesperadamente, falla la prueba
            fail('La promesa debería haberse rechazado, pero se resolvió inesperadamente.');
        } catch (error) {
            // Verifica si el error es del tipo correcto y contiene el mensaje esperado
            expect(error instanceof Error).toBe(true);
            expect(error.message).toBe('The path does not exist');
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
    it("Debería resolver con un objeto con 'url', 'status' y 'ok' si la solicitud GET es exitosa", async () => {
        const url = 'https://es.wikipedia.org/wiki/Markdown'; // URL de ejemplo para una solicitud exitosa
        const result = await makingGetCall(url);
        expect(result).toEqual(expect.objectContaining({ href: url, statusCode: expect.any(Number), status: 'ok' }));
    });

    it("Debería rechazar con un objeto con 'url', 'status' y 'ok' si la solicitud GET falla", async () => {
        const nonExistingUrl = 'https://nodejs.org/es/about/'; // URL de ejemplo que provocará una solicitud fallida
        try {
            await makingGetCall(nonExistingUrl);
        } catch (error) {
            expect(error).toEqual(expect.objectContaining({ href: nonExistingUrl, statusCode: 404, status: 'fail' }));
        }
    });
});