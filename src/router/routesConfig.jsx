import { Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar";


export const routesConfigAuthenticated = [
    {
        path: '/',
        element:<CalendarPage/>
    },
    {
        path: '/*',
        element: <Navigate to={'/'}/>
    },
]
export const routesConfigNotAuthenticated = [
    {
        path: '/auth/login',
        element:<LoginPage/>
    },
    {
        path: '/*',
        element:<Navigate to={'/auth/login'}/>
    },
]


