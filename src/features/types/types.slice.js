import { createSlice } from '@reduxjs/toolkit';
import getTypes from './types.service';

const typesSlice = createSlice({
    name: 'types',
    initialState: {
        list: []
    },
    reducers: {
        setTypes: (state, action) => {
            state.list = action.payload;
        }
    }
});

const { setTypes } = typesSlice.actions;

export const fetchTypes = () => async dispatch => {
    const types = await getTypes();
    dispatch(setTypes(types));
}

export const selectTypes = state => state.types.list;

export default typesSlice.reducer;