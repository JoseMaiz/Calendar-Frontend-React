import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from 'react-modal';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks';
import { SpanishModal } from './SpanishModal';
import { EnglishModal } from './EnglishModal';

registerLocale('es',es)

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');


export const CalendarModal = () => {

    const {isDateModalOpen, closeDateModal} = useUiStore();

    const {activeEvent,startSavigEvent,setActiveEvent,whatIsLanguage} = useCalendarStore()
    
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title:'',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ?''
            :'is-invalid';

    }, [formValues.title, formSubmitted]);

    useEffect(() => {
        if(activeEvent !== null){
            setFormValues({
                ...activeEvent
            })
        }
    }, [activeEvent])
    
    
    const onCloseModal = ()=>{

        closeDateModal();
        setFormSubmitted(false);
        setActiveEvent(null);
        
    };

    const onInputChanged = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChanged = (event, changing)=>{
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = async (event)=>{
        
        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if(isNaN(difference) || difference <= 0){
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas','error');
            return;
        }

        if(formValues.title.length <= 0) return;

        await startSavigEvent(formValues);
        closeDateModal();
        setFormSubmitted(false);
        setActiveEvent(null);

    }
    
    return (
        <Modal
            isOpen = {isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName='modal-fondo'
            closeTimeoutMS={200}
        >

            {
                (whatIsLanguage)
                ?<h1> Nuevo evento </h1>
                :<h1> New Event </h1>
            }
            <hr />
            <form className="container" onSubmit={onSubmit}>

                {
                    (whatIsLanguage)
                    ?<SpanishModal 
                        formValues= {formValues} 
                        onDateChanged= {onDateChanged} 
                        titleClass= {titleClass} 
                        onInputChanged= {onInputChanged}
                    />
                    :<EnglishModal 
                        formValues= {formValues} 
                        onDateChanged= {onDateChanged} 
                        titleClass= {titleClass} 
                        onInputChanged= {onInputChanged}
                    />
                }


            </form>
        </Modal>
    )
}


