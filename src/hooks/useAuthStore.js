import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { OnLogoutCalendar, clearErrorMessage, onChecking, onLogin, onLogout } from "../store";


export const useAuthStore = ()=>{

    const {status, user, errorMessage} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email,password}) =>{
        
        dispatch(onChecking());

        try {

            const {data} = await calendarApi.post('/auth', {email,password});
            
            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime());

            dispatch(onLogin({ name: data.name, uid: data.uid }) );

        } catch (error) {

            dispatch(onLogout('Credenciales incorrectas'));

            setTimeout( () => {
                dispatch(clearErrorMessage());
            }, 10);

        }
    };

    const startRegister = async({name,email,password})=>{
        
        dispatch(onChecking());

        try {

            const {data} = await calendarApi.post('/auth/new', {name,email,password});

            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            
            dispatch(onLogin({ name: data.name, uid: data.uid }) );
            
        } catch (error) {
            const {msg,errors} = error.response.data;
            if(errors) dispatch(onLogout(errors));
            if(msg) dispatch(onLogout('El usuario ya existe'));

            // *Otra forma de resolver mandando el error sin especificar en que campo esta el problema
            // dispatch(onLogout(error.response.data?.msg || 'Hay un problema en el nombre, el correo o la clave'));

            setTimeout( () => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async()=>{
                
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());

        try {
            const {data} = await calendarApi('/auth/renew');

            localStorage.setItem('token',data.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            
            dispatch(onLogin({ name: data.name, uid: data.uid }) );
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout('token expiro'));
        }
    };

    const startLogout = () =>{
        localStorage.clear();
        dispatch(OnLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        // * Propiedades
        status,
        user,
        errorMessage,

        // *Metodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}

