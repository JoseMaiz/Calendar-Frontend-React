

import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños del Jefe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours(new Date(), 4),
//     bgColor: '#fafafa',
//     user:{
//         _id: '123',
//         name: 'Jose Maiz'
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvent: true,
        events: [
            // tempEvent,
        ],
        activeEvent: null,
        isLanguage: 'es'
    },
    reducers: {
        onSetActiveEvent: (state, {payload} ) => {
            // Remenber: Redux Toolkit allows us to write 'mutating' logic in reducers.
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, {payload} ) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, {payload} ) => {
            state.events = state.events.map(event => {
                if(event.id === payload.id) return payload;
                return event
            });
        },
        onDeleteEvent: (state ) => {
            if(state.activeEvent){
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },
        onLanguajeEnglish: (state) => {
            state.isLanguage = 'en';
        },
        onLanguajeSpanish: (state) => {
            state.isLanguage = 'es';
        },
        onLoadEvents: (state,{payload = []}) => {
            
            state.isLoadingEvent = false;
            payload.forEach(event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                
                if (!exists) {
                    state.events.push(event);
                };
                
            });        
            // *Manera alternativa
            // state.events = payload 
        },
        OnLogoutCalendar: (state) => {
            state.isLoadingEvent = true
            state.events = []
            state.activeEvent = null
            state.isLanguage = 'es'
    
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    onAddNewEvent,
    onDeleteEvent,
    onLanguajeEnglish,
    onLanguajeSpanish,
    onLoadEvents,
    OnLogoutCalendar, 
    onSetActiveEvent,
    onUpdateEvent, } = calendarSlice.actions;

