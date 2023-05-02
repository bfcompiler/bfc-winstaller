// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::{Runtime, Manager};

#[tauri::command]
pub async fn generate_appdata<R: Runtime>(
    app: tauri::AppHandle<R>,
    window: tauri::Window<R>,
) -> Result<(), String> {
    use std::{fs, path::PathBuf};
    let state = app.state::<super::super::InstallerState>();
	state.0.lock().unwrap().install_state = 1;
	drop(state);
    let mut bfc_appdata_folder = PathBuf::from(std::env::var("localappdata").unwrap());
    bfc_appdata_folder.push("bfc");
    if fs::read_dir(&bfc_appdata_folder).is_err() {
        fs::create_dir(&bfc_appdata_folder).unwrap();
    }
    window.emit_all("generate_appdata", bfc_appdata_folder.to_str().unwrap().to_string()).unwrap();
    Ok(())
}
