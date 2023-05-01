// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { createSlice } from "@reduxjs/toolkit";

export const bashCommandSlice = createSlice({
	name: "bashCommand",
	initialState: {
		command: "",
		code: 0,
		output: "",
		completed: false
	},
	reducers: {
		setCommandOutput: (state, action) => {
			state.code = action.payload.status;
			state.command = action.payload.command;
			state.output = action.payload.output;
			state.completed = true;
		},
		flushCommand: (state) => {
			state = {
				command: "",
				code: 0,
				output: "",
				completed: false
			}
		}
	}
});

export const { setCommandOutput, flushCommand } = bashCommandSlice.actions;
export default bashCommandSlice.reducer;