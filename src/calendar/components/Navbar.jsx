import { useAuthStore, useCalendarStore } from "../../hooks"


export const Navbar = () => {

    const {changeLanguajeSpanish,changeLanguajeEnglish,whatIsLanguage} = useCalendarStore();
    const {startLogout, user} = useAuthStore();


    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">

            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                {user.name}
            </span>
            <div>
                <button
                    className="btn btn-outline-primary me-2"
                    onClick={changeLanguajeSpanish}
                    aria-label="btn-español"
                >
                    ESPAÑOL
                </button>
                
                <button
                    className="btn btn-outline-primary"
                    onClick={changeLanguajeEnglish}
                    aria-label="btn-english"
                >
                    ENGLISH
                </button>

            </div>

            {
                (whatIsLanguage)
                ?<button 
                    className="btn btn-outline-danger"
                    onClick={startLogout}
                    aria-label="btn-Salir"
                >
                    <i className="fas fa-sign-out-alt"></i>
                    &nbsp;
                    <span>Salir</span>
                </button>
                :<button
                    className="btn btn-outline-danger"
                    onClick={startLogout}
                    aria-label="btn-out"
                >
                    <i className="fas fa-sign-out-alt"></i>
                    &nbsp;
                    <span>Out</span>
                </button>
            }



        </div>
    )
}
