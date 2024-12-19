import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import paginationSlice from './slices/paginationSlice';
import { blogApi } from './slices/apiSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    pagination: paginationSlice.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

export default store;
