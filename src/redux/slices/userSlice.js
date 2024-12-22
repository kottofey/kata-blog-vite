import { createSlice } from '@reduxjs/toolkit';

import { parseJwt, removeToken } from '../../utils/jwt';

const initialState = {
  username: null,
  email: null,
  image: null,
  token: null,
  // parsed: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      const { username, email, token, image } = action.payload;
      state.username = username;
      state.email = email;
      state.token = token;
      state.image =
        image ||
        'https://static.productionready.io/images/smiley-cyrus.jpg';
      // state.parsed = parseJwt(action.payload.token);
    },
    setLogout: (state) => {
      removeToken();
      state.username = null;
      state.email = null;
      state.image = null;
      state.token = null;
    },
    setEditUser: (state, action) => {},
    setLikeArticle: (state, action) => {},
    setUnlikeArticle: (state, action) => {},
  },
});

export default userSlice;
export const {
  setLogin,
  setLogout,
  setEditUser,
  setLikeArticle,
  setUnlikeArticle,
} = userSlice.actions;
