

export const events = [

    {
        id: "1",
        start: new Date('2023-06-10 10:00:00'),
        end: new Date('2023-06-10 12:00:00'),
        title: 'Cumpleaños de Jose Maiz',
        notes: 'Alguna nota de prueba',
    },
    {
        id: "2",
        start: new Date('2023-09-07 10:00:00'),
        end: new Date('2023-06-10 12:00:00'),
        title: 'Cumpleaños de Josefa',
        notes: 'Alguna nota de prueba de Josefa',
    },
];

export const initialStateCalendar = {
    isLoadingEvent: true,
    events: [],
    activeEvent: null,
    isLanguage: 'es'
};
export const initialStateCalendarEnglish = {
    isLoadingEvent: true,
    events: [],
    activeEvent: null,
    isLanguage: 'en'
};
export const calendarWithEventsState = {
    isLoadingEvent: false,
    events: [...events],
    activeEvent: null,
    isLanguage: 'es'
};
export const calendarWithActiveEventState = {
    isLoadingEvent: false,
    events: [...events],
    activeEvent: {...events[0]},
    isLanguage: 'es'
};