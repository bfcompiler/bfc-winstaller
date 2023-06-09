// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::{Manager, Runtime};

#[tauri::command]
pub async fn setup_bfc<R: Runtime>(
    app: tauri::AppHandle<R>,
    _: tauri::Window<R>,
	path: String
) -> Result<(), String> {
	use std::{fs, path::PathBuf};
	let bfc_dir = PathBuf::from(&path);
	let bfc_dir_contents = fs::read_dir(&bfc_dir).unwrap();
	let mut exe_name = String::new();
	for i in bfc_dir_contents.into_iter() {
		let file_name = i.unwrap().file_name();
		let file_name = file_name.to_str().unwrap();
		if file_name.ends_with(".exe") {
			exe_name = file_name.to_string();
			break;
		}
	}
	let mut original_exe_path = PathBuf::from(&path);
	original_exe_path.push(exe_name);
	let mut new_exe_path = PathBuf::from(&path);
	new_exe_path.push("bfc.exe");
	fs::rename(original_exe_path, new_exe_path).unwrap();
	let state = app.state::<super::super::InstallerState>();
	state.0.lock().unwrap().install_state = 3;
	drop(state);
    Ok(())
}
