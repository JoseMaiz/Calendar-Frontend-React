import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
import { useUiStore } from "../../../src/hooks/useUiStore";

jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useUiStore');

describe('Pruenas en el <FabDelete/>', () => {

    const mockStartDeledingEvent = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('Debe de mostrar el componente correctamente', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });
        useUiStore.mockReturnValue({
            isDateModalOpen: false
        })
        
        render(<FabDelete/>);

        const btn = screen.getByLabelText('btn-delete');

        expect(btn.className).toContain('btn');
        expect(btn.className).toContain('btn-danger');
        expect(btn.className).toContain('fab-danger');
        expect(btn.style.display).toBe('none');
    });

    test('Debe de mostrar el boton si hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });
        useUiStore.mockReturnValue({
            isDateModalOpen: false
        })
        
        render(<FabDelete/>);

        const btn = screen.getByLabelText('btn-delete');

        expect(btn.style.display).toBe('');
    });

    test('Debe de llamar startDeletingEvent si hay evento activo', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeledingEvent:mockStartDeledingEvent
        });
        useUiStore.mockReturnValue({
            isDateModalOpen: false
        })
        
        render(<FabDelete/>);

        const btn = screen.getByLabelText('btn-delete');
        fireEvent.click(btn);

        expect(mockStartDeledingEvent).toHaveBeenCalled();
    });

});
