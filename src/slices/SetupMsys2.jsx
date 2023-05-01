// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from '@reduxjs/toolkit';

export const setupMsys2Slice = createSlice({
	name: "setupMsys2",
	initialState: {
		completed: false
	},
	reducers: {
		setMsys2Setup: (state, action) => {
			state.completed = action.payload;
		}
	}
});

export const { setMsys2Setup } = setupMsys2Slice.actions;
export default setupMsys2Slice.reducer;