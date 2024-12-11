import { createSlice } from '@reduxjs/toolkit';

const articlesSlice = createSlice({
  name: 'pagination',
  initialState: {
    page: 1,
    pageSize: 5,
  },
  reducers: {
    setPage: (state, action) => {},
    setPageSize: (state, action) => {},
  },
});

export default articlesSlice;
