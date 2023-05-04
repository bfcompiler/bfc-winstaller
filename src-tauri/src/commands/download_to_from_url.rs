// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::Runtime;

#[tauri::command]
pub async fn download_to_from_url<R: Runtime>(
    _: tauri::AppHandle<R>,
    _: tauri::Window<R>,
    url: String,
    path: String,
) -> Result<String, String> {
    use std::{fs, io::Write, path::PathBuf, str::FromStr};
    let file = PathBuf::from(&path);
    let mut file = fs::File::create(file).unwrap();
    let request =
        reqwest::Request::new(reqwest::Method::GET, reqwest::Url::from_str(&url).unwrap());
    let client = reqwest::Client::builder()
        .user_agent("bfc-winstaller")
        .build()
        .unwrap();
    let response = client.execute(request).await.unwrap();
    let response = response.bytes().await.unwrap().to_vec();
    file.write_all(&response[..]).unwrap();
    Ok(path)
}
