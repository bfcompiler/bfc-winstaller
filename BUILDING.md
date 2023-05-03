# Building Brainf\*\*k Compiler W-installer
### Version # 0.1.2

---

## Tools required
1. Windows 10/11 
2. NPM / NodeJS v19 (Personally on v19.8.1)
3. Yarn v3 (Personally on v3.5.1)
4. Rust toolchain (atleast v1.69.0 and it's Visual Studio dependency) (Personally on v1.71.0-nightly)
I also personally use Powershell v7 for my commandline interface.

---

## How to build
Assuming all tools are installed and on the correct versions, the following should work as expected.
1. Clone repository: `git clone https://github.com/bfcompiler/bfc-winstaller.git --recursive`
2. Enter directory: `cd bfc-winstaller`
3. Install yarn dependencies: `yarn`
4. Build using yarn: `yarn tauri build`
5. Executable is available at `<PROJECT DIRECTORY>/src-tauri/target/release/bfc-winstaller.exe`