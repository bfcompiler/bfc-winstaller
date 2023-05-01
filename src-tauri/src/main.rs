// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![feature(fmt_internals)]

mod commands;

fn main() {
    tauri::Builder::default()
        .invoke_handler(commands::get_handler())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
