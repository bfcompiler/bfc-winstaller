// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from '@reduxjs/toolkit';

export const appdataSlice = createSlice({
	name: "appdata",
	initialState: {
		path: ""
	},
	reducers: {
		setAppdataPath: (state, action) => {
			state.path = action.payload;
		}
	}
});

export const { setAppdataPath } = appdataSlice.actions;
export default appdataSlice.reducer;