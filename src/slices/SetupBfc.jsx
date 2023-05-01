// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from "@reduxjs/toolkit";

export const setupBfcSlice = createSlice({
	name: "setupBfc",
	initialState: {
		complete: false
	},
	reducers: {
		setBfcSetup: (state) => {
			state.complete = true;
		}
	}
});

export const { setBfcSetup } = setupBfcSlice.actions;
export default setupBfcSlice.reducer;