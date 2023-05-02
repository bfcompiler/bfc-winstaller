// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from '@reduxjs/toolkit';

export const detectRerunSlice = createSlice({
	name: "detectRerun",
	initialState: {
		rerun: null
	},
	reducers: {
		setIsRerun: (state, action) => {
			state.rerun = action.payload;
		}
	}
});

export const { setIsRerun } = detectRerunSlice.actions;
export default detectRerunSlice.reducer;