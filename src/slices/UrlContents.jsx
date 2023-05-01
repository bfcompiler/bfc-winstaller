// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from "@reduxjs/toolkit";

export const urlContentsSlice = createSlice({
	name: "urlContents",
	initialState: {
		contents: "",
		url: ""
	},
	reducers: {
		setContents: (state, action) => {
			state.contents = action.payload.contents;
			state.url = action.payload.url;
		}
	}
});

export const { setContents } = urlContentsSlice.actions;
export default urlContentsSlice.reducer;