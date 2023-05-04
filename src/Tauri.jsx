// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { tauri, event } from '@tauri-apps/api';

import store from './Store';
import { setComplete as downloadSetComplete } from './slices/DownloadedFile';
import { setComplete as extractSetComplete } from './slices/ExtractXZTar'
import { setDeleted } from './slices/DeleteFile';
import { setCommandOutput } from './slices/BashCommand';
import { setMsys2Setup } from './slices/SetupMsys2';
import { setUnzipped } from './slices/UnzipFile';
import { setBfcSetup } from './slices/SetupBfc';

export function open_link_in_default_browser(url) {
	tauri.invoke("open_url", { url });
}

export function generate_appdata() {
	return new Promise((res, rej) => {
		tauri.invoke("generate_appdata").then(payload => {
			res(payload);
		});
	});
}

export function get_url_contents(url) {
	return new Promise((res, rej) => {
		tauri.invoke("get_url_contents", { url }).then(payload => {
			res(payload);
		});
	});
}

export function download_to_from_url(url, path) {
	let unlisten;
	event.listen("download_to_from_url", event => {
		store.dispatch(downloadSetComplete({
			file: event.payload,
			complete: true
		}));
		unlisten();
	}).then(e => unlisten = e);
	tauri.invoke("download_to_from_url", { url, path });
}

export function extract_tar_xz(input, output) {
	let unlisten;
	event.listen("extract_tar_xz", event => {
		store.dispatch(extractSetComplete({
			file: event.payload,
			complete: true
		}));
		unlisten();
	}).then(e => unlisten = e);
	tauri.invoke("extract_tar_xz", { xzPath: input, outputPath: output });
}

export function delete_path(path) {
	let unlisten;
	event.listen("delete_path", event => {
		store.dispatch(setDeleted({
			file: event.payload,
			complete: true
		}));
		unlisten();
	}).then(e => unlisten = e);
	tauri.invoke("delete_file", { path });
}

export function run_bash_command(path, command) {
	let unlisten;
	event.listen("run_bash_command", event => {
		store.dispatch(setCommandOutput({
			command: event.payload.command,
			code: event.payload.status,
			output: event.payload.output,
			completed: true
		}));
		unlisten();
	}).then(e => unlisten = e);
	tauri.invoke("run_bash_command", { path, command });
}

export function setup_msys2(path) {
	let unlisten;
	event.listen("setup_msys2", event => {
		store.dispatch(setMsys2Setup(true));
		unlisten();
	}).then(e => unlisten = e);
	tauri.invoke("setup_msys2", { path });
}

export function unzip_file(input, output) {
	let unlisten;
	event.listen("unzip_file", event => {
		store.dispatch(setUnzipped({
			completed: true,
			file: event.payload
		}));
		unlisten();
	}).then(e => unlisten = e);
	tauri.invoke("unzip_file", { input, output });
}

export function setup_bfc(path) {
	let unlisten;
	event.listen("setup_bfc", event => {
		store.dispatch(setBfcSetup());
		unlisten();
	}).then(e => unlisten = e);
	tauri.invoke("setup_bfc", { path });
}

export function detect_rerun() {
	return new Promise((res, rej) => {
		tauri.invoke("detect_rerun").then(payload => {
			res(payload);
		});
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