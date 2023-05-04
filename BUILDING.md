# Building Brainf\*\*k Compiler W-installer
### Version # 0.1.4

---

## Tools required
1. Windows 10/11 
2. NPM / NodeJS v19 (Personally on v19.8.1)
3. Yarn v3 (Personally on v3.5.1)
4. Rust toolchain (atleast v1.69.0 and it's Visual Studio dependency) (Personally on v1.71.0-nightly)
I also personally use Powershell v7 for my commandline interface.
5. Tauri CLI v1.3.0 (Installed through Cargo)

---

## How to build
Assuming all tools are installed and on the correct versions, the following should work as expected.
1. Clone repository: `git clone https://github.com/bfcompiler/bfc-winstaller.git --recursive`
2. Enter directory: `cd bfc-winstaller`
3. Install yarn dependencies: `yarn install`
4. Build using yarn: `cargo tauri build --target x86_64-pc-windows-msvc -- -Z build-std=std,panic_abort -Z build-std-features=panic_immediate_abort`
5. Executable is available at `<PROJECT DIRECTORY>/src-tauri/target/x86_64-pc-windows-msvc/release/bfc-winstaller.exe`

---

## Compressing executable even further
To compress the executable I recommend using the Ultimate Packer for eXecutables (UPX), available at [upx.github.io](https://upx.github.io/).
Here are the steps to setup and use to compress the executable.
1. Download [UPX](https://upx.github.io/) to the root of the project
2. Extract ZIP archive in same directory as the ZIP file
3. Pack executable using UPX, using the command: `./<UPX DIRECTORY>/upx.exe -f9 ./src-tauri/target/x86_64-pc-windows-msvc/release/bfc-winstaller.exe`