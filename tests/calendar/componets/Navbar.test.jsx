import { fireEvent, render, screen } from "@testing-library/react";
import { useAuthStore } from "../../../src/hooks/useAuthStore";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
import { authenticatedState } from "../../fixtures/authState";
import { Navbar } from "../../../src/calendar/components/Navbar";

jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useAuthStore');

describe('Pruebas en Navbar', () => {

    const mockstartLogout = jest.fn();
    const mockChangeLanguajeSpanish = jest.fn();
    const mockChangeLanguajeEnglish = jest.fn();
    beforeEach(()=> jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente', () => {
        
        useCalendarStore.mockReturnValue({
            whatIsLanguage: true
        })
        useAuthStore.mockReturnValue({
            user: authenticatedState.user
        });

        render(<Navbar/>);

        expect(screen.getByText(authenticatedState.user.name)).toBeTruthy();
    });

    test('Debe de accionar el boton de salir en (español)', () => {
        
        useCalendarStore.mockReturnValue({
            whatIsLanguage: true,
        });
        useAuthStore.mockReturnValue({
            user: authenticatedState.user,
            startLogout: mockstartLogout
        });

        render(<Navbar/>);

        const btnSalir = screen.getByLabelText('btn-Salir');

        fireEvent.click(btnSalir);

        expect(mockstartLogout).toHaveBeenCalled();
    });

    test('Debe de accionar el boton de out en (english)', () => {
        
        useCalendarStore.mockReturnValue({
            whatIsLanguage: false
        })
        useAuthStore.mockReturnValue({
            user: authenticatedState.user,
            startLogout: mockstartLogout
        });

        render(<Navbar/>);

        const btnOut = screen.getByLabelText('btn-out');

        fireEvent.click(btnOut);

        expect(mockstartLogout).toHaveBeenCalled();
    });

    test('Debe de accionar correctamente el boton de español y el boton de english', () => {
        
        useCalendarStore.mockReturnValue({
            whatIsLanguage: true,
            changeLanguajeSpanish:mockChangeLanguajeSpanish,
            changeLanguajeEnglish:mockChangeLanguajeEnglish,

        })
        useAuthStore.mockReturnValue({
            user: authenticatedState.user,
        });

        render(<Navbar/>);

        // *Se verifica el accionamiento del boton de español
        const btnEspañol = screen.getByLabelText('btn-español');
        fireEvent.click(btnEspañol);
        
        expect(mockChangeLanguajeSpanish).toHaveBeenCalled();

        // *Se verifica el accionamiento del boton de english
        const btnEnglish = screen.getByLabelText('btn-english');
        fireEvent.click(btnEspañol);

        expect(mockChangeLanguajeSpanish).toHaveBeenCalled();
    });
});