// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::Runtime;

#[tauri::command]
pub async fn detect_rerun<R: Runtime>(
    _: tauri::AppHandle<R>,
    _: tauri::Window<R>,
) -> Result<bool, String> {
    use std::path::PathBuf;
    let mut bfc_appdata_folder = PathBuf::from(std::env::var("localappdata").unwrap());
    bfc_appdata_folder.push("bfc");
    let mut bfc_exe = bfc_appdata_folder.clone();
    let mut msys64_folder = bfc_appdata_folder.clone();
    bfc_exe.push("bfc.exe");
    msys64_folder.push("msys64");
    if bfc_appdata_folder.exists() && bfc_exe.exists() && msys64_folder.exists() {
        Ok(true)
    } else {
        Ok(false)
    }
}
