

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
    },
    reducers: {
        onOpenDateModal: (state ) => {
            // Remenber: Redux Toolkit allows us to write 'mutating' logic in reducers.
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state ) => {

            state.isDateModalOpen = false;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal,onCloseDateModal } = uiSlice.actions;

