import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: null,
    following: [],
    likedPosts: [],
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.user.isLoggedIn = !state.user.isLoggedIn;
    },
    logout: (state, action) => {},
    setLike: (state, action) => {},
    unsetLike: (state, action) => {},
    follow: (state, action) => {},
    unfollow: (state, action) => {},
  },
});

export default userSlice;
