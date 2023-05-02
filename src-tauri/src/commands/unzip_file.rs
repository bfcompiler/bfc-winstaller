// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::{Runtime, Manager};

#[tauri::command]
pub async fn unzip_file<R: Runtime>(
    _: tauri::AppHandle<R>,
    window: tauri::Window<R>,
	input: String,
	output: String
) -> Result<(), String> {
	use std::fs::File;
	use zip::ZipArchive;
	let raw_zip = File::open(&input).unwrap();
	let mut zip_file = ZipArchive::new(raw_zip).unwrap();
	zip_file.extract(&output).unwrap();
	drop(zip_file);
	window.emit_all("unzip_file", &input).unwrap();
    Ok(())
}
