const { default: calendarApi } = require("../../src/api/calendarApi");

describe('Pruebas en el CalendarApi', () => {

    test('Debe de tener la configuracion', () => {
        
        expect(process.env.VITE_API_URL).toBe(calendarApi.defaults.baseURL);
    });

    test('Debe de tener el x-token en el header de todas las peticiones', async() => {
        
        const token = 'ABC-123-XYZ'
        localStorage.setItem('token', token );

        try {

            const res = await calendarApi.get('/auth');
            console.log(res);
            
        } catch (error) {
            expect(error.config.headers["x-token"]).toBe(token);
        }

    });
})