import { render, screen, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { CalendarPage } from "../../src/calendar";

jest.mock('../../src/hooks/useAuthStore')

jest.mock('react-modal', () => ({
    ...jest.requireActual('react-modal'),
    setAppElement: jest.fn()
  }));

  jest.mock('../../src/calendar', ()=>({
    CalendarPage: ()=> <h1>CalendarPage</h1>
  }));
  jest.mock('../../src/auth/pages/LoginPage', ()=>({
    LoginPage: ()=> <h1>LoginPage</h1>
  }));

describe('Prueba en AppRouter', () => {

    const mockcheckAuthToken = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('Debe de mostrar la pantalla de caega y llamar checkAuthToken', () => {
        
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken:mockcheckAuthToken,
        });

        render(<AppRouter/>);

        const h3 = screen.getByRole('heading', {level:3});

        expect(mockcheckAuthToken).toHaveBeenCalled();
        expect(h3.innerHTML).toBe('Cargando...');
        expect(h3.className).toBe('loading');

    });

    test('Debe de mostrar el calendario si esta autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken:mockcheckAuthToken,
        });

        render(<AppRouter/>);

        expect(screen.getByText('CalendarPage')).toBeTruthy();

    });
});

