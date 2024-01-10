import { fireEvent, render, screen } from "@testing-library/react";
import { useUiStore } from "../../../src/hooks/useUiStore";
import { FabAddNew } from "../../../src/calendar/components/FabAddNew";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
import { addHours } from "date-fns";

jest.mock('../../../src/hooks/useUiStore');
jest.mock('../../../src/hooks/useCalendarStore');

describe('Prueba en FabAddNew', () => {

    const mocksetActiveEvent = jest.fn();
    const mockOpenDateModal = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente', () => {

        useUiStore.mockReturnValue({
            isDateModalOpen: false
        });
        useCalendarStore.mockReturnValue({
            setActiveEvent: mocksetActiveEvent
        });

        render(<FabAddNew/>);

        const btn = screen.getByRole('button');

        expect(btn.className).toContain('btn');
        expect(btn.className).toContain('btn-primary');
        expect(btn.className).toContain('fab');
        expect(btn.disabled).toBe(false);

    });

    test('Debe de estar activa la propiedad disable en el boton', () => {

        useUiStore.mockReturnValue({
            isDateModalOpen: true
        });
        useCalendarStore.mockReturnValue({
            setActiveEvent: mocksetActiveEvent
        });

        render(<FabAddNew/>);

        const btn = screen.getByRole('button');

        expect(btn.disabled).toBe(true);
    });

    test('Debe de activa el boton', () => {

        useUiStore.mockReturnValue({
            isDateModalOpen: false,
            openDateModal:mockOpenDateModal,
        });
        useCalendarStore.mockReturnValue({
            setActiveEvent: mocksetActiveEvent
        });

        render(<FabAddNew/>);

        const btn = screen.getByRole('button');
        fireEvent.click(btn)

        expect(mocksetActiveEvent).toHaveBeenCalled();
        expect(mockOpenDateModal).toHaveBeenCalled();
    });
});

