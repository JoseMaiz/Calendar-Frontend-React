import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    onAddNewEvent,
    onDeleteEvent,
    onLanguajeEnglish,
    onLanguajeSpanish,
    onLoadEvents,
    onSetActiveEvent,
    onUpdateEvent } from "../store";
import { calendarApi } from "../api";
import { convertToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events,activeEvent,isLanguage} = useSelector(state => state.calendar);
    const whatIsLanguage = useMemo(() => (isLanguage === 'es')? true : false, [isLanguage]);
    const {user} = useSelector(state => state.auth);

    const changeLanguajeSpanish = ()=>{
        dispatch(onLanguajeSpanish());
    }
    const changeLanguajeEnglish = ()=>{
        dispatch(onLanguajeEnglish());
    }

    const setActiveEvent = (calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavigEvent = async(calendarEvent)=>{

        try {
            if (calendarEvent.id) {
                //* Actualizando
                await calendarApi.put(`/events/${calendarEvent.id}`,calendarEvent);
                dispatch(onUpdateEvent({...calendarEvent, user}));
                return;
            };
    
            //* creando
            const {data} = await calendarApi.post("/events",calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}));
            
        } catch (error) {
            console.error(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

    };

    const startDeledingEvent = async()=>{
        // TODO Llegar al backend

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`);
            dispatch(onDeleteEvent());
            
        } catch (error) {
            console.error(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
        }

    };

    const startLoadingEvent = async()=>{
        
        try {
            const {data} = await calendarApi.get('/events');
            const events = convertToDateEvents(data.eventos);

            dispatch(onLoadEvents(events));

        } catch (error) {
            console.error('Error cargando evento');
            console.log(error);
        }
    }

    return{
        
        // *Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        isLanguage,
        whatIsLanguage,

        // * Metodos
        changeLanguajeEnglish,
        changeLanguajeSpanish,
        setActiveEvent,
        startDeledingEvent,
        startLoadingEvent,
        startSavigEvent,
    }
}


