import {
  buildCreateSlice,
  asyncThunkCreator,
} from '@reduxjs/toolkit';

import { removeToken } from '../../utils/jwt';

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState = {
  username: null,
  email: null,
  image: null,
  token: null,
  // parsed: {},
};

const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: (create) => ({
    setUser: create.reducer((state, action) => {
      const { username, email, token, image } = action.payload;
      state.username = username;
      state.email = email;
      state.token = token;
      state.image =
        image || `https://robohash.org/${username}?set=set4`;
    }),
    clearUser: create.reducer((state) => {
      removeToken();
      state.username = null;
      state.email = null;
      state.image = null;
      state.token = null;
    }),
  }),
});

export default userSlice;
export const {
  setUser,
  clearUser,
  editUser,
  likeArticle,
  unlikeArticle,
} = userSlice.actions;
