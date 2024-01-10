import { useCalendarStore, useUiStore } from "../../hooks"


export const FabDelete = () => {

    const {startDeledingEvent,hasEventSelected} = useCalendarStore();
    const {isDateModalOpen} = useUiStore();

    const handleDelete = ()=>{
        startDeledingEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            aria-label="btn-delete"
            onClick={handleDelete}
            style={{
                display: (hasEventSelected && !isDateModalOpen) ? '' : 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}


