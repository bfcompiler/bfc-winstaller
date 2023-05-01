// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from "@reduxjs/toolkit";

export const extractXZTarSlice = createSlice({
	name: "extractXZTar",
	initialState: {
		file: "",
		complete: false
	},
	reducers: {
		setComplete: (state, action) => {
			state.file = action.payload.file;
			state.complete = action.payload.complete;
		}
	}
});

export const { setComplete } = extractXZTarSlice.actions;
export default extractXZTarSlice.reducer;