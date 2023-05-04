// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { tauri } from '@tauri-apps/api';

export function open_link_in_default_browser(url) {
	tauri.invoke("open_url", { url });
}

export function generate_appdata() {
	return new Promise(res => {
		tauri.invoke("generate_appdata").then(payload => res(payload));
	});
}

export function get_url_contents(url) {
	return new Promise(res => {
		tauri.invoke("get_url_contents", { url }).then(payload => res(payload));
	});
}

export function download_to_from_url(url, path) {
	return new Promise(res => {
		tauri.invoke("download_to_from_url", { url, path }).then(payload => res(payload));
	});
}

export function extract_tar_xz(input, output) {
	return new Promise(res => {
		tauri.invoke("extract_tar_xz", { xzPath: input, outputPath: output }).then(() => res());
	});
}

export function delete_path(path) {
	return new Promise(res => {
		tauri.invoke("delete_path", { path }).then(() => res());
	});
}

export function run_bash_command(path, command) {
	return new Promise(res => {
		tauri.invoke("run_bash_command", { path, command }).then(payload => res(payload))
	});
}

export function setup_msys2(path) {
	return new Promise(res => {
		tauri.invoke("setup_msys2", { path }).then(() => res());
	});
}

export function unzip_file(input, output) {
	return new Promise(res => {
		tauri.invoke("unzip_file", { input, output }).then(() => res());
	});
}

export function setup_bfc(path) {
	return new Promise(res => {
		tauri.invoke("setup_bfc", { path }).then(() => res());
	});	
}

export function detect_rerun() {
	return new Promise(res => {
		tauri.invoke("detect_rerun").then(payload => res(payload));
	});
}

export function exit_process() {
	tauri.invoke("exit_process");
}

export default {
	open_link_in_default_browser,
	generate_appdata,
	get_url_contents,
	download_to_from_url,
	extract_tar_xz,
	delete_path,
	run_bash_command,
	setup_msys2,
	unzip_file,
	setup_bfc,
	detect_rerun,
	exit_process
};