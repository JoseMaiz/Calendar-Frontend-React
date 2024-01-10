import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";


describe('Prueba en uiSlice', () => {

    test('Debe de regresar el estado por defecto', () => {
        
        // * Dos manera disrintas de verificar el initial state por defecto
        expect(uiSlice.getInitialState()).toEqual({isDateModalOpen: false});
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();

    });

    test('Debe de cambiar el isDateModalOpen correctamente', () => {

        // * Cambio mediante el create action funtion: onOpenDateModal()
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());
        
        // *Dos maneras distintas de verificar el cambio del estado
        expect(state).toEqual({isDateModalOpen: true});
        expect(state.isDateModalOpen).toBeTruthy();
        
        // * Cambio mediante el create action funtion: onOpenDateModal()
        state = uiSlice.reducer(state, onCloseDateModal());
        
        // *Dos maneras distintas de verificar el cambio del estado
        expect(state).toEqual({isDateModalOpen: false});
        expect(state.isDateModalOpen).toBeFalsy();
    });
});


