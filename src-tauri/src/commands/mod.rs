// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::{Invoke, Wry};

mod delete_file;
mod download_to_from_url;
mod extract_tar_xz;
mod generate_appdata;
mod get_url_contents;
mod open_url;
mod run_bash_commnd;
mod setup_msys2;
mod unzip_file;
mod setup_bfc;
mod exit_process;
mod detect_rerun;

use delete_file::delete_file;
use download_to_from_url::download_to_from_url;
use extract_tar_xz::extract_tar_xz;
use generate_appdata::generate_appdata;
use get_url_contents::get_url_contents;
use open_url::open_url;
use run_bash_commnd::run_bash_commnd;
use setup_msys2::setup_msys2;
use unzip_file::unzip_file;
use setup_bfc::setup_bfc;
use exit_process::exit_process;
use detect_rerun::detect_rerun;

pub fn get_handler() -> impl Fn(Invoke<Wry>) {
    move |invoke| {
        match invoke.message.command() {
            "download_to_from_url" => download_to_from_url::__cmd__download_to_from_url!(download_to_from_url, invoke),
            "extract_tar_xz" => extract_tar_xz::__cmd__extract_tar_xz!(extract_tar_xz, invoke),
            "generate_appdata" => generate_appdata::__cmd__generate_appdata!(generate_appdata, invoke),
            "get_url_contents" => get_url_contents::__cmd__get_url_contents!(get_url_contents, invoke),
            "open_url" => open_url::__cmd__open_url!(open_url, invoke),
            "delete_file" => delete_file::__cmd__delete_file!(delete_file, invoke),
            "run_bash_command" => run_bash_commnd::__cmd__run_bash_commnd!(run_bash_commnd, invoke),
            "setup_msys2" => setup_msys2::__cmd__setup_msys2!(setup_msys2, invoke),
            "unzip_file" => unzip_file::__cmd__unzip_file!(unzip_file, invoke),
            "setup_bfc" => setup_bfc::__cmd__setup_bfc!(setup_bfc, invoke),
            "exit_process" => exit_process::__cmd__exit_process!(exit_process, invoke),
            "detect_rerun" => detect_rerun::__cmd__detect_rerun!(detect_rerun, invoke),
            _ => (),
        };
    }
}
