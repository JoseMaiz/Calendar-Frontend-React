import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authState";
import { testUserCredentials } from "../../fixtures/testUser";


describe('Pruebas en authSlice', () => {

    test('Debe de regresar el estado inicial', () => {
        
        expect(authSlice.getInitialState()).toEqual(initialState);
    });

    test('Debe de regresar el estado checking', () => {
        
        const state = authSlice.reducer(authenticatedState, onChecking());

        expect(state).toEqual({
            status: 'checking',
            user:{},
            errorMessage: undefined
        });
    });

    
    test('Debe de realizar un login', () => {
        
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        // console.log(state);

        expect(state.user).toBe(testUserCredentials);
        expect(state).toEqual({
            status: 'authenticated',
            user:testUserCredentials,
            errorMessage: undefined
        });
    });

    test('Debe de realizar un logout', () => {
        
        const state = authSlice.reducer(authenticatedState, onLogout());

        expect(state).toEqual({
            status: 'not-authenticated',
            user:{},
            errorMessage: undefined
        });
    });

    test('Debe de realizar un logout con mensaje de error', () => {
        
        const errorMessage = 'Se salio de la cuenta (credenciales no validas)';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

        expect(state.errorMessage).toEqual(errorMessage);
        expect(state).toEqual({
            status: 'not-authenticated',
            user:{},
            errorMessage
        });
    });

    test('Debe de limpiar el mensaje de error', () => {
        
        const errorMessage = 'Se salio de la cuenta (credenciales no validas)';
        const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        const newstate = authSlice.reducer(authenticatedState, clearErrorMessage());

        expect(newstate.errorMessage).toBe(undefined);


    });


});

