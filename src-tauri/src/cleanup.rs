// Copyright (c) 2023 Jacob Allen Morris
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

pub fn kill_process_mid_msys2_install() {
    let mut root_process_path = std::path::PathBuf::from(std::env::var("localappdata").unwrap());
    root_process_path.push("bfc\\msys64\\usr\\bin\\");

    let mut gpg = root_process_path.clone();
    let mut dirmngr = root_process_path.clone();
    let mut gpg_agent = root_process_path.clone();
    let mut bash = root_process_path.clone();
    let mut pacman = root_process_path.clone();

    gpg.push("gpg.exe");
    dirmngr.push("dirmngr.exe");
    gpg_agent.push("gpg-agent.exe");
    bash.push("bash.exe");
    pacman.push("pacman.exe");

    let gpg = gpg.to_string_lossy().to_string();
    let dirmngr = dirmngr.to_string_lossy().to_string();
    let gpg_agent = gpg_agent.to_string_lossy().to_string();
    let bash = bash.to_string_lossy().to_string();
    let pacman = pacman.to_string_lossy().to_string();

    let mut clean: Vec<String> = Vec::new();
    clean.push(gpg);
    clean.push(dirmngr);
    clean.push(gpg_agent);
    clean.push(bash);
    clean.push(pacman);

	close_processes(clean);
}

pub fn delete_appdata() {
    use std::{fs, env, path::PathBuf};
    let mut appdata = PathBuf::from(env::var("localappdata").unwrap());
    appdata.push("bfc");
    let mut res = fs::remove_dir_all(&appdata);
    if res.is_err() {
        loop {
            res = fs::remove_dir_all(&appdata);
            if res.is_ok() {
                break;
            }
        }
    }
    res.unwrap();
}

fn close_processes(input_process_paths: Vec<String>) {
    use std::path::PathBuf;
    use windows::{
        core::PWSTR,
        Win32::{
            Foundation::HANDLE,
            System::{
                Diagnostics::ToolHelp::{
                    CreateToolhelp32Snapshot, Process32FirstW, Process32NextW, PROCESSENTRY32W,
                    TH32CS_SNAPPROCESS,
                },
                Threading::{
                    OpenProcess, QueryFullProcessImageNameW, TerminateProcess, PROCESS_NAME_FORMAT,
                    PROCESS_QUERY_INFORMATION, PROCESS_TERMINATE, PROCESS_VM_READ,
                },
            },
        },
    };

    let mut input_process_paths_pb = Vec::new();
    for i in 0..input_process_paths.len() {
        input_process_paths_pb.push(PathBuf::from(input_process_paths[i].clone()));
    }

    unsafe {
        let mut entry = PROCESSENTRY32W::default();
        entry.dwSize = std::mem::size_of::<PROCESSENTRY32W>() as u32;
        let snapshot: HANDLE = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0).unwrap();
        Process32FirstW(snapshot, &mut entry);
        while Process32NextW(snapshot, &mut entry).into() {
            let tmp_name = entry
                .szExeFile
                .into_iter()
                .map(|x| x as u8)
                .collect::<Vec<u8>>();
            let mut process_name = String::new();
            {
                let mut hit = false;
                for i in 0..tmp_name.len() {
                    let index = tmp_name.len() - i - 1;
                    if !hit {
                        if tmp_name[index] != ('\0' as u8) {
                            hit = true;
                            process_name = String::from_utf8((&[tmp_name[index]]).to_vec())
                                .unwrap()
                                + process_name.as_str();
                        }
                    } else {
                        process_name = String::from_utf8((&[tmp_name[index]]).to_vec()).unwrap()
                            + process_name.as_str();
                    }
                }
            }
            for item in input_process_paths_pb.iter() {
                let input_filename = item.file_name().unwrap().to_str();
                let input_filename = input_filename.unwrap();
                let input_path_string = item.to_string_lossy().to_string();
                if process_name == input_filename {
                    let process_handle = OpenProcess(
                        PROCESS_QUERY_INFORMATION | PROCESS_VM_READ | PROCESS_TERMINATE,
                        true,
                        entry.th32ProcessID,
                    )
                    .unwrap();
                    let mut process_path: Vec<u16> = Vec::new();
                    process_path.resize(256, 0);
                    let process_path_ptr = PWSTR(process_path.as_ptr().cast_mut() as *mut u16);
                    let mut process_path_length = 256;
                    QueryFullProcessImageNameW(
                        process_handle,
                        PROCESS_NAME_FORMAT(0),
                        process_path_ptr,
                        &mut process_path_length,
                    );
                    let tmp_process_path_test =
                        String::from_utf16(&process_path[..process_path_length as usize]).unwrap();
                    if tmp_process_path_test == input_path_string {
                        TerminateProcess(process_handle, 0);
                    }
                }
            }
        }
    }
}
