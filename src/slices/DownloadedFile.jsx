// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from "@reduxjs/toolkit";

export const downloadedFileSlice = createSlice({
	name: "downloadedFile",
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

export const { setComplete } = downloadedFileSlice.actions;
export default downloadedFileSlice.reducer;