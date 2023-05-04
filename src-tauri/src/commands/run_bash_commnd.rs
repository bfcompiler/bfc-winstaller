// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::Runtime;

#[derive(serde::Serialize, Clone, Debug)]
pub struct Output {
    output: String,
    status: i32,
    command: String,
}

#[tauri::command]
pub async fn run_bash_commnd<R: Runtime>(
    _: tauri::AppHandle<R>,
    _: tauri::Window<R>,
    path: String,
    command: String,
) -> Result<Output, String> {
    use std::{
        os::windows::process::CommandExt,
        process::{Command, Stdio},
    };
    let msys2 = Command::new(path.as_str())
        .args(&["-c", format!("PATH=$PATH:/usr/bin ; {}", command).as_str()])
        .creation_flags(0x8000000)
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .stdin(Stdio::piped())
        .spawn()
        .unwrap();
    let output = msys2.wait_with_output().unwrap();
    Ok(Output {
        output: String::from_utf8(output.stdout).unwrap(),
        status: output.status.code().unwrap(),
        command,
    })
}
