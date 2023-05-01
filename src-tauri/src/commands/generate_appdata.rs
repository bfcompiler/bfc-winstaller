// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

#[tauri::command]
pub fn generate_appdata() -> String {
    use std::{path::PathBuf, fs};
    let mut bfc_appdata_folder = PathBuf::from(std::env::var("localappdata").unwrap());
    bfc_appdata_folder.push("bfc");
    if fs::read_dir(&bfc_appdata_folder).is_err() {
        fs::create_dir(&bfc_appdata_folder).unwrap();
    }
    bfc_appdata_folder.to_str().unwrap().to_string()
}