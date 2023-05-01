// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from "@reduxjs/toolkit";

export const unzipFileSlice = createSlice({
	name: "unzipFile",
	initialState: {
		file: "",
		complete: false
	},
	reducers: {
		setUnzipped: (state, action) => {
			state.complete = action.payload.completed;
			state.file = action.payload.file;
		}
	}
});

export const { setUnzipped } = unzipFileSlice.actions;
export default unzipFileSlice.reducer;