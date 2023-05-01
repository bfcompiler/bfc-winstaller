// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::{Runtime, Manager};

#[tauri::command]
pub async fn extract_tar_xz<R: Runtime>(
    _: tauri::AppHandle<R>,
    window: tauri::Window<R>,
    xz_path: String,
    output_path: String,
) -> Result<(), String> {
    use std::{path::PathBuf, fs::{self, File}, io::BufReader};
    use tar::Archive;
    tauri::async_runtime::spawn(async move {
        let xz_path = PathBuf::from(&xz_path);
        let output_path = PathBuf::from(&output_path);
        if fs::read_dir(&output_path).is_err() {
            fs::create_dir(&output_path).unwrap();
        }
        let mut xz_reader = BufReader::new(File::open(&xz_path).unwrap());
        let mut xz_output: Vec<u8> = Vec::new();
        lzma_rs::xz_decompress(&mut xz_reader, &mut xz_output).unwrap();
        drop(xz_reader);
        let mut archive = Archive::new(&xz_output[..]);
        archive.unpack(output_path).unwrap();
        window.emit_all("extract_tar_xz", &xz_path).unwrap();
    });
    Ok(())
}