import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { authSlice } from "../../src/store";
import { useAuthStore } from "../../src/hooks";
import { authenticatedState, initialState, notAuthenticatedState } from "../fixtures/authState";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState)=>{
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState:{
            auth:{...initialState}
        }
    });
};


describe('Pruebas en useAuthStore', () => {

    beforeEach(()=> localStorage.clear());

    test('Debe de regresar los valores por defectos', () => {
        
        const mockStore = getMockStore(initialState);

        const {result} = renderHook(()=> useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        });
    });

    test('startLogin debe de realizar el login correctamente', async() => {
        
        const mockStore = getMockStore({...notAuthenticatedState})
        const {result} = renderHook(()=> useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const {startLogin} = result.current
        await act( async()=>{
            await startLogin(testUserCredentials);
        })
        
        const {status, user:{name,uid}, errorMessage} = result.current; 

        expect({status, errorMessage}).toEqual({
            status: 'authenticated',
            errorMessage: undefined,
        });
        expect({name,uid}).toEqual({
            name: testUserCredentials.name,
            uid: testUserCredentials.uid
        });
        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));

    });

    test('startLogin debe de fallar la authenticación', async() => {

        const mockStore = getMockStore({...notAuthenticatedState})
        const {result} = renderHook(()=> useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const {startLogin} = result.current
        await act( async()=>{
            await startLogin({
                email: "testUser@google.com",
                password: "12345"
            });
        });

        const {status, user, errorMessage} = result.current; 

        expect({status, user, errorMessage}).toEqual({
            status: 'not-authenticated',
            errorMessage: 'Credenciales incorrectas',
            user: {}
        });
        expect(localStorage.getItem('token')).toBe(null)

        // *Aqui se espera que se dispare una acción que tiene un retraso mediante on timeout
        await waitFor(
            ()=> expect(result.current.errorMessage).toBe(undefined)
        )
    });

    test('startRegister debe de crear un usuario', async() => {

        const newUser = {
            email: "pruebar@google.com",
            password: "23242526",
            name: 'Test user 2'
        }
        const mockStore = getMockStore({...notAuthenticatedState})
        const {result} = renderHook(()=> useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        // *Esto se hace para interceptar una petición y regrese un valor que se establezca 
        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                "ok": true,
                "uid": "1234567890875432",
                "name": "Test user",
                "token": "ALGUN-TOKEN"
            }
        });

        const {startRegister} = result.current
        await act( async()=>{
            await startRegister(newUser);
        });

        const {status, user, errorMessage} = result.current;

        expect({status, user, errorMessage}).toEqual({
            status: 'authenticated',
            errorMessage: undefined,
            user: {name: 'Test user', uid: '1234567890875432'}
        });

        // *Esto es para destruir el spy
        spy.mockRestore();
    });

    test('startRegister debe fallar la creación', async() => {

        const mockStore = getMockStore({...notAuthenticatedState})
        const {result} = renderHook(()=> useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const {startRegister} = result.current
        await act( async()=>{
            await startRegister(testUserCredentials);
        });

        const {status, user, errorMessage} = result.current;

        expect({status, user, errorMessage}).toEqual({
            status: 'not-authenticated',
            errorMessage: 'El usuario ya existe',
            user: {}
        });

        await waitFor(
            ()=> expect(result.current.errorMessage).toBe(undefined)
        )
    });

    test('checkAuthToken debe de fallar si no hay token', async() => {
        const mockStore = getMockStore({...initialState})
        const {result} = renderHook(()=> useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const {checkAuthToken} = result.current
        await act( async()=>{
            await checkAuthToken();
        });

        const {status, user, errorMessage} = result.current;

        expect({status, user, errorMessage}).toEqual({
            status: 'not-authenticated',
            errorMessage: undefined,
            user: {}
        });

    });

    test('checkAuthToken debe de authenticar el usuario si hay un token', async() => {
        
        // *Se realiza el login ante de empezar la prueba para obtener el token
        const {data} = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem('token',data.token);

        const mockStore = getMockStore({...initialState})
        const {result} = renderHook(()=> useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const {checkAuthToken} = result.current
        await act( async()=>{
            await checkAuthToken();
        });

        const {status, user, errorMessage} = result.current;

        expect({status, user, errorMessage}).toEqual({
            status: 'authenticated',
            user: { name: 'Test user', uid: '65964daea1f92a95678a770c' },
            errorMessage: undefined,
        });

    });
    test('startLogout debe de realizar logout correctamente', async() => {
        
        const mockStore = getMockStore({...authenticatedState})
        const {result} = renderHook(()=> useAuthStore(),{
            wrapper: ({children}) => <Provider store={mockStore}>{children}</Provider>
        });

        const {startLogout} = result.current
        await act( async()=>{
            await startLogout();
        });

        const {status, user, errorMessage} = result.current;

        expect({status, user, errorMessage}).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined,
        });
    });
});