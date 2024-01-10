import { OnLogoutCalendar, calendarSlice, onAddNewEvent, onDeleteEvent, onLanguajeEnglish, onLanguajeSpanish, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialStateCalendar, initialStateCalendarEnglish } from "../../fixtures/calendarState";


describe('pruebas en calendarSlice.js', () => {

    test('Debe de regresar el estado por defecto', () => {
        
        const state = calendarSlice.getInitialState();

        expect(state).toEqual(initialStateCalendar);
    });

    test('onSetActiveEvent debe de activar el evento', () => {
        
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));

        expect(state.activeEvent).toBe(events[0]);
    });

    test('onAddNewEvent debe de agregar el evento', () => {
        
        const newEvent ={
            id: "3",
            start: new Date('2023-06-20 10:00:00'),
            end: new Date('2023-06-20 12:00:00'),
            title: 'Cumpleaños de Pepe',
            notes: 'Alguna nota de prueba!!!',
        };

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));
        
        expect(state.events).toEqual([...events, newEvent]);
    });

    test('onUpdateEvent debe de actualizar el evento', () => {
        
        const newEventUpdate ={
            id: "1",
            start: new Date('2023-06-10 14:00:00'),
            end: new Date('2023-06-10 16:00:00'),
            title: 'Cumpleaños de Jose Maiz actualizado',
            notes: 'Alguna nota de prueba!!!!!!',
        };

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(newEventUpdate));

        // *Tres maneras distintas de verificar la actualización del evento
        expect(state.events[0]).toBe(newEventUpdate);
        expect(state.events).toContain(newEventUpdate);
        expect(state.events).toEqual([newEventUpdate, events[1]]);
    });

    test('onDeleteEvent debe de borrar el evento activo', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());

        expect(state.events).not.toContain(calendarWithActiveEventState.activeEvent);
        expect(state).toEqual({...calendarWithActiveEventState, activeEvent: null, events: [events[1]]});
        expect(state.activeEvent).toBe(null);
    });

    test('onLoadEvents debe de establecer los eventos', () => {

        const state = calendarSlice.reducer(initialStateCalendar,onLoadEvents([...events]));

        expect(state.events).toEqual(events);
        expect(state.isLoadingEvent).toBe(false);

    });

    test('OnLogoutCalendar debe de limpiar el estado', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState,OnLogoutCalendar());

        expect(state).toEqual(initialStateCalendar);
    });

    test('onLanguajeSpanish debe de cambiar el idioma al español', () => {

        const state = calendarSlice.reducer(initialStateCalendarEnglish,onLanguajeSpanish());
        expect(state.isLanguage).toBe('es');
    });

    test('onLanguajeEnglish debe de cambiar el idioma al ingles', () => {

        const state = calendarSlice.reducer(initialStateCalendar,onLanguajeEnglish());
        expect(state.isLanguage).toBe('en');
    });


});

