// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from "@reduxjs/toolkit";

export const deleteFileSlice = createSlice({
	name: "deleteFile",
	initialState: {
		file: "",
		complete: false
	},
	reducers: {
		setDeleted: (state, action) => {
			state.file = action.payload.file;
			state.complete = action.payload.complete;
		}
	}
});

export const { setDeleted } = deleteFileSlice.actions;
export default deleteFileSlice.reducer;