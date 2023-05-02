// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::{Manager, Runtime};

#[tauri::command]
pub async fn delete_file<R: Runtime>(
    _: tauri::AppHandle<R>,
    window: tauri::Window<R>,
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
                window
                    .emit_all("delete_path", path.to_str().unwrap())
                    .unwrap();
                break;
            }
        }
    } else {
        window
            .emit_all("delete_path", path.to_str().unwrap())
            .unwrap();
    }
    Ok(())
}
