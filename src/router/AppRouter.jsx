import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routesConfigAuthenticated, routesConfigNotAuthenticated } from "./routesConfig"
import { useAuthStore } from "../hooks";
import { useEffect } from "react";


export const AppRouter = () => {

    const {status,checkAuthToken} = useAuthStore()

    // const authStatus = 'not-authenticated' //authenticated

    const routerNotAuthenticated = createBrowserRouter(routesConfigNotAuthenticated);
    const routerAuthenticated = createBrowserRouter(routesConfigAuthenticated);

    useEffect(() => {
        checkAuthToken()
    }, [])
    

    return (status === 'checking')
        ?<h3 className="loading">Cargando...</h3>
        :(status === 'not-authenticated')
            ?<RouterProvider router={routerNotAuthenticated}/>
            :<RouterProvider router={routerAuthenticated}/>
}


