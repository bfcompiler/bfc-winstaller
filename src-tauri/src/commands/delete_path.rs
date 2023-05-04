// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::Runtime;

#[tauri::command]
pub async fn delete_path<R: Runtime>(
    _: tauri::AppHandle<R>,
    _: tauri::Window<R>,
    path: String,
) -> Result<(), String> {
    use std::{
        fs,
        path::{Path, PathBuf},
        thread::sleep,
        time::Duration,
    };
    let path = PathBuf::from(&path);
    if Path::new(&path).exists() {
        let mut removing_file = fs::remove_file(&path);
        loop {
            if removing_file.is_err() {
                sleep(Duration::from_millis(500));
                removing_file = fs::remove_file(&path);
            } else {
                removing_file.unwrap();
                break;
            }
        }
    }
    Ok(())
}
