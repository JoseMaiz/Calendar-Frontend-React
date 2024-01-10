import DatePicker from "react-datepicker";

export const SpanishModal = ({formValues,onDateChanged,titleClass,onInputChanged}) => {

    return (
        <>
            <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                <br />
                <DatePicker
                    selected={formValues.start}
                    className="form-control"
                    onChange={(event)=> onDateChanged(event, 'start')}
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>Fecha y hora fin</label>
                <br />
                <DatePicker
                    minDate={formValues.start}
                    selected={formValues.end}
                    className="form-control"
                    onChange={(event)=> onDateChanged(event, 'end')}
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={onInputChanged}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChanged}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>
        </>
    )
}


