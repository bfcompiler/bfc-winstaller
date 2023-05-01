// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::Runtime;

#[tauri::command]
pub async fn exit_process<R: Runtime>(_: tauri::AppHandle<R>, _: tauri::Window<R>) -> Result<(), String> {
  use std::process;
  process::exit(0);
}