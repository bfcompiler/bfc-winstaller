// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::{Runtime, Manager};

#[tauri::command]
pub async fn setup_msys2<R: Runtime>(
    app: tauri::AppHandle<R>,
    window: tauri::Window<R>,
	path: String
) -> Result<(), String> {
    use std::{process::{Command, Stdio}, os::windows::process::CommandExt};
	let state = app.state::<super::super::InstallerState>();
	state.0.lock().unwrap().install_state = 2;
	drop(state);
	let msys2 = Command::new("cmd.exe")
		.creation_flags(0x8000000)
		.args(&["/c", path.as_str(), "-mingw64", "-no-start", "-defterm", "-c", "\"\""])
		.stdout(Stdio::piped())
		.stderr(Stdio::piped())
		.spawn()
		.unwrap();
	msys2.wait_with_output().unwrap();
	window.emit_all("setup_msys2", true).unwrap();
	Ok(())
}
