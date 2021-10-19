import { configureStore } from'@reduxjs/toolkit';
import typesReducer from '../features/types/types.slice';

export default configureStore({
    reducer: {
        types: typesReducer
    }
});