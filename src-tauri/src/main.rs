// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![feature(fmt_internals)]

mod cleanup;
mod commands;

use std::sync::Mutex;
use tauri::{Manager, WindowEvent};

pub struct InstallerState(Mutex<Installer>);

pub struct Installer {
    pub install_state: u8,
}

impl Default for Installer {
    fn default() -> Self {
        Installer {
            install_state: 0,
        }
    }
}

impl InstallerState {
    pub fn install_state(&mut self, state: u8) {
        self.0.lock().unwrap().install_state = state;
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(commands::get_handler())
        .manage(InstallerState(Default::default()))
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();
            let handle = app.app_handle();
            main_window.on_window_event(move |event| match event {
                WindowEvent::Destroyed => {
                    let state = handle.state::<InstallerState>();
                    let install_state = state.0.lock().unwrap().install_state.clone();
                    drop(state);
                    println!("Install state: {}", install_state);
                    if install_state == 1 {
                        cleanup::delete_appdata();
                    } else if install_state == 2 {
                        cleanup::kill_process_mid_msys2_install();
                        cleanup::delete_appdata();
                    }
                }
                _ => {}
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
