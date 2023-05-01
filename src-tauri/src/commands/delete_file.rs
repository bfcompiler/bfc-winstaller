// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::{Runtime, Manager};

#[tauri::command]
pub async fn delete_file<R: Runtime>(
    _: tauri::AppHandle<R>,
    window: tauri::Window<R>,
    path: String,
) -> Result<(), String> {
    use std::{
        fs,
        path::{Path, PathBuf},
    };
    tauri::async_runtime::spawn(async move {
        let path = PathBuf::from(&path);
        if Path::new(&path).exists() {
            fs::remove_file(&path).unwrap();
            window.emit_all("delete_path", path.to_str().unwrap()).unwrap();
        } else {
			window.emit_all("delete_path", path.to_str().unwrap()).unwrap();
        }
    });
    Ok(())
}
