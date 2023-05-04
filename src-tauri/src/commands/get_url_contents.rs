// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

use tauri::Runtime;

#[tauri::command]
pub async fn get_url_contents<R: Runtime>(
    _: tauri::AppHandle<R>,
    _: tauri::Window<R>,
    url: String,
) -> Result<String, String> {
    use std::str::FromStr;
    let request =
        reqwest::Request::new(reqwest::Method::GET, reqwest::Url::from_str(&url).unwrap());
    let client = reqwest::Client::builder()
        .user_agent("bfc-winstaller")
        .build()
        .unwrap();
    let response = client.execute(request).await.unwrap();
    let response = response.bytes().await.unwrap().to_vec();
    let response = std::str::from_utf8(&response[..]).unwrap();
    Ok(response.into())
}
