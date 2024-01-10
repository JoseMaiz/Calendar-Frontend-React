import DatePicker from "react-datepicker";

export const EnglishModal = ({formValues,onDateChanged,titleClass,onInputChanged}) => {

    return (
        <>
            <div className="form-group mb-2">
                <label>Start date and time</label>
                <br />
                <DatePicker
                    selected={formValues.start}
                    className="form-control"
                    onChange={(event)=> onDateChanged(event, 'start')}
                    dateFormat='Pp'
                    showTimeSelect
                    locale='en'
                    // timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>End date and time</label>
                <br />
                <DatePicker
                    minDate={formValues.start}
                    selected={formValues.end}
                    className="form-control"
                    onChange={(event)=> onDateChanged(event, 'end')}
                    dateFormat='Pp'
                    showTimeSelect
                    locale='en'
                    // timeCaption='Hora'
                />
            </div>

            <div className="form-group mb-2">
                <label>Title and notes</label>
                <input 
                    type="text" 
                    className={`form-control ${titleClass}`}
                    placeholder="Event title"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={onInputChanged}
                />
                <small id="emailHelp" className="form-text text-muted">short description</small>
            </div>

            <div className="form-group mb-2">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notes"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={onInputChanged}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Additional information</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Save</span>
            </button>
        </>
    )
}


