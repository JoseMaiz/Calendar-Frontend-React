// En caso de necesitar la implementación del FetchAPI
// npm i --save-dev whatwg-fetch
// import 'whatwg-fetch'; 

// En caso de encontrar paquetes que lo requieran 
// npm i --save-dev setimmediate
// import 'setimmediate';

// En caso de tener variables de entorno y aún no soporta el import.meta.env
// npm i --save-dev dotenv
require('dotenv').config({
    path: '.env.test'
});

// Realizar el mock completo de las variables de entorno
jest.mock('./src/helpers/getEnvVariable', () => ({
    getEnvVariable: () => ({ ...process.env })
}));