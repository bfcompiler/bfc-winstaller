// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::{Runtime, Manager};

#[tauri::command]
pub async fn generate_appdata<R: Runtime>(
    app: tauri::AppHandle<R>,
    _: tauri::Window<R>,
) -> Result<String, String> {
    use std::{fs, path::PathBuf, env};
    let state = app.state::<super::super::InstallerState>();
	state.0.lock().unwrap().install_state = 1;
	drop(state);
    let mut bfc_appdata_folder = PathBuf::from(env::var("localappdata").unwrap());
    bfc_appdata_folder.push("bfc");
    if fs::read_dir(&bfc_appdata_folder).is_err() {
        fs::create_dir(&bfc_appdata_folder).unwrap();
    }
    Ok(bfc_appdata_folder.to_str().unwrap().to_string())
}
