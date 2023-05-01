// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

#[tauri::command]
pub fn open_url(url: String) {
    use std::os::windows::process::CommandExt;
    std::process::Command::new("cmd.exe")
        .args(&["/c", "start", url.as_str()])
        .creation_flags(0x8000000)
        .spawn()
        .unwrap();
}