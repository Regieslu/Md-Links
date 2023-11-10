# MdLinks!

El presente proyecto se desarrolla una librería Node.js que se usa como herramienta para analizar links dentro de archivos markdown. Esta librería está disponible como un módulo publicado en GitHub listo para instalarse y así poder importar en otros proyectos. 

## Funcionalidad de la librería
Contamos con una biblioteca que simplifica la conversión de rutas de archivos de relativas a absolutas. Esta librería realiza una verificación para determinar si el archivo existe; en caso contrario, devuelve un error como respuesta. Una vez realizada esta validación, se procede a verificar si el archivo encontrado es de formato markdown. En caso afirmativo, se inicia la lectura del archivo, identificamos enlaces y extraemos información crucial como el texto, href, statusCode y status, indicando la ruta del archivo que se está leyendo con el marcador 'file'. Esta serie de pasos garantiza una gestión efectiva de archivos markdown, ofreciendo detalles específicos sobre sus enlaces y estado de respuesta.

## Diagrama de flujo MdLinks 

<a href="https://ibb.co/sm2p811"><img src="https://i.ibb.co/Rv9GR66/Screen-Shot-2023-11-10-at-10-46-57.png" alt="Screen-Shot-2023-11-10-at-10-46-57" border="0"></a>


## Node.js
Node.js es un entorno de ejecución de JavaScript del lado del servidor que permite a los desarrolladores crear aplicaciones web escalables. Utiliza el motor V8 de Google Chrome para ejecutar código JavaScript fuera del navegador. Node.js es conocido por su enfoque de E/S sin bloqueo y orientado a eventos, lo que lo hace eficiente y adecuado para aplicaciones en tiempo real y de alto rendimiento. Permite a los desarrolladores utilizar JavaScript tanto en el lado del cliente como en el del servidor, facilitando la sincronización entre ambas partes de una aplicación web.

## Herramientas de programación utilizadas
 - **JavaScript**: es un lenguaje de programación versátil y de alto nivel que se utiliza principalmente en el desarrollo web permitiendo la manipulación dinámica de contenido, la creación de efectos visuales y la interacción con el usuario.
 - **Módulo `fs`** : es una biblioteca incorporada que proporciona funciones para interactuar con el sistema de archivos. Permite realizar operaciones como leer y escribir archivos, crear directorios, manipular permisos y más.
 -  **Módulo `path`** : se utiliza para trabajar con rutas de archivos y directorios de manera independiente del sistema operativo. Permite manipular y construir rutas de manera consistente, independientemente si se trabaja en un entorno Windows, Linux o macOS. Este módulo es útil para crear rutas seguras y portables, así como para resolver problemas relacionados con las diferencias en la representación de rutas entre sistemas operativos.
 - **Axios**: es una librería JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP, por lo que podremos configurar y realizar solicitudes a un servidor y recibiremos respuestas fáciles de procesar.
 - **EsLint**: es una herramienta para identificar e informar sobre patrones encontrados en código ECMAScript/JavaScript, con el objetivo de hacer que el código sea más consistente y evitar errores. ESLint es completamente modular.
 - **Test unitarios con jest** (`npm run test`): son pruebas que evalúan el comportamiento individual y aislado de una pieza pequeña de código. El objetivo principal de las pruebas unitarias es verificar que la unidad funcione correctamente sin tener en cuenta el entorno.

## Funciones JavaScript

 - `getAbsolutePath`: esta función acepta una ruta como entrada, verifica si es relativa o absoluta, y la convierte a una ruta absoluta si es necesario, devolviendo la ruta resultante. La salida final de la función es la ruta absoluta correspondiente.
 - `fileExists`: devuelve una promesa que se resuelve si el archivo en la ruta proporcionada existe y se rechaza con un error si no existe. Esto proporciona una forma asincrónica de verificar la existencia de un archivo en el sistema de archivos.
 - `getLinksFromFile`: devuelve una promesa que se resuelve con un arreglo de objetos que representan los enlaces extraídos del archivo, o se rechaza con un error si la lectura del archivo falla.
 - `isMarkdown`: verifica si un archivo es un archivo Markdown al comprobar si su extensión está en la lista de extensiones asociadas a Markdown. Si la extensión coincide con alguna de las extensiones especificadas, la función devuelve `true`; de lo contrario, devuelve `false`.
 - `isUrlValid`: utiliza una expresión regular para realizar una verificación simple pero efectiva de si una cadena representa una URL válida.
 - `makingGetCall`: realiza una llamada GET a una URL utilizando Axios, y devuelve una Promesa que se resuelve con información detallada si la llamada es exitosa, o se rechaza con información detallada si hay un error en la llamada. Esto permite gestionar de manera efectiva las respuestas y errores de las solicitudes GET realizadas a las URL proporcionadas.
 - `mdLinks`: esta función utiliza las antes mencionadas funciones modularizadas para validar URLs, verificar la existencia de archivos, extraer enlaces de archivos Markdown y realizar llamadas GET a las URLs extraídas. La salida en la consola proporciona información sobre el estado de las URL y los detalles de las respuestas, así como el manejo de errores. 
 
## Testing
`npm run test`/`npm test`

<a href="https://ibb.co/2K9d47P"><img src="https://i.ibb.co/w6k4mNC/Screen-Shot-2023-11-10-at-10-52-27.png" alt="Screen-Shot-2023-11-10-at-10-52-27" border="0"></a>
 
## Github projects
Para priorizar, organizar y hacer el seguimiento del flujo de trabajo se hizo uso de **[issues](https://docs.github.com/es/issues)** y **[milestones](https://docs.github.com/es/issues/using-labels-and-milestones-to-track-work/about-milestones)** para el hito 1 e hito 2. 


