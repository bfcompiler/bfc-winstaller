// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { Layout, Space, Typography, Progress, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import color from 'onecolor';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

import { HIGHLIGHT_COLOR, BACKGROUND_COLOR } from '../ColorScheme';
import tf from '../Tauri';
import CONSTANTS from '../Constants';
import { flushCommand } from '../slices/BashCommand';

export default function MSYS2DownloaderPage() {
	const nav = useNavigate();
	const adpath = useSelector(state => state.appdata.path);
	const dispatch = useDispatch();

	const [step, setStep] = React.useState(0);
	const [stepMessage, setStepMessage] = React.useState("Querying MSYS2 Releases");

	React.useEffect(() => {
		switch (step) {
			case 1:
				setStepMessage("Downloading MSYS2 package");
				break;
			case 2:
				setStepMessage("Extracting MSYS2 package");
				break;
			case 3:
				setStepMessage("Deleting unused files");
				break;
			case 4:
				setStepMessage("Setting up MSYS2 environment");
				break;
			case 5:
				setStepMessage("Downloading mingw64 toolchain");
				break;
			case 6:
				setStepMessage("Completed");
		}
	}, [step]);

	const bashCommand = useSelector(state => state.bashCommand);
	React.useEffect(() => {
		if (bashCommand.command == "pacman -Sy --noconfirm mingw-w64-x86_64-toolchain" && bashCommand.completed == true) {
			console.log(bashCommand.output);
			setStep(6);
			dispatch(flushCommand());
		}
	}, [bashCommand])

	const msys2Completed = useSelector(state => state.setupMsys2.completed);
	React.useEffect(() => {
		if (msys2Completed) {
			setStep(5);
			tf.run_bash_command(adpath + "\\msys64\\usr\\bin\\bash.exe", "pacman -Sy --noconfirm mingw-w64-x86_64-toolchain");
		}
	}, [msys2Completed]);

	const deletedFile = useSelector(state => state.deleteFile.file);
	const deleteComplete = useSelector(state => state.deleteFile.complete);
	React.useEffect(() => {
		if (deletedFile == adpath + "\\msys2.tar.xz" && deleteComplete) {
			setStep(4);
			tf.setup_msys2(adpath + "\\msys64\\msys2_shell.cmd");
		}
	}, [deleteComplete, deletedFile, adpath])

	const extractedFile = useSelector(state => state.extractXZTar.file);
	const extractComplete = useSelector(state => state.extractXZTar.complete);
	React.useEffect(() => {
		if (extractedFile == adpath + "\\msys2.tar.xz" && extractComplete) {
			setStep(3);
			tf.delete_path(adpath + "\\msys2.tar.xz");
		}
	}, [extractedFile, extractComplete, adpath]);

	const downloadedFile = useSelector(state => state.downloadedFile.file);
	const downloadComplete = useSelector(state => state.downloadedFile.complete);
	React.useEffect(() => {
		if (downloadedFile == adpath + "\\msys2.tar.xz" && downloadComplete) {
			setStep(2);
			tf.extract_tar_xz(adpath + "\\msys2.tar.xz", adpath);
		}
	}, [downloadedFile, downloadComplete, adpath]);

	const [msys2XZURL, setMsys2XZURL] = React.useState("");
	const rawUrlContents = useSelector(state => state.urlContents.contents);
	const selectedUrl = useSelector(state => state.urlContents.url);
	React.useEffect(() => {
		if (selectedUrl == CONSTANTS['MSYS2_DATA_URL'] && msys2XZURL == "") {
			let parsed = JSON.parse(rawUrlContents);
			let assets = parsed[0].assets;
			for (let i = 0; i < assets.length; i++) {
				if (assets[i].name.endsWith(".tar.xz")) {
					tf.download_to_from_url(assets[i].browser_download_url, adpath + "\\msys2.tar.xz");
					setMsys2XZURL(assets[i].browser_download_url);
					setStep(1);
					break;
				}
			}
		}
	}, [selectedUrl, rawUrlContents, msys2XZURL, adpath]);

	React.useEffect(() => {
		tf.generate_appdata();
		tf.get_url_contents(CONSTANTS['MSYS2_DATA_URL']);
	}, []);

	return <div onContextMenu={e => e.preventDefault()}>
		<Space direction='vertical' style={{ width: "100%", position: "absolute", top: "0px", left: "0px" }} size={"small"}>
			<Layout >
				<Header style={{
					textAlign: 'center',
					color: '#fff',
					paddingInline: 50,
					lineHeight: '64px',
					backgroundColor: HIGHLIGHT_COLOR,
					height: "100px"
				}}>
					<Title style={{
						color: "#fff",
						textAlign: "left",
						cursor: "default",
						WebkitUserSelect: "none",
						transform: "translate(-40px, -5px)"
					}} copyable={false}>Brainf**k Winstaller</Title>
				</Header>
				<Content style={{
					textAlign: 'center',
					minHeight: 120,
					lineHeight: '120px',
					color: '#fff',
					backgroundColor: BACKGROUND_COLOR,
					height: "500px"
				}}>
					<Title style={{
						WebkitUserSelect: "none"
					}}>Creating environment</Title>
					<Paragraph style={{
						WebkitUserSelect: "none"
					}}>You can download MSYS2 from <span style={{
						color: "#0000EE",
						textDecoration: "underline",
						cursor: "pointer",
						WebkitUserSelect: "none"
					}} onClick={() => tf.open_link_in_default_browser("https://www.msys2.org/")}>msys2.org</span></Paragraph>
					<Progress type="circle" percent={step / 6 * 100} format={percent => Math.round(percent) + "%"} />
					<Paragraph style={{
						position: "relative",
						top: "50px",
						fontWeight: "bold",
						color: color("#000").lightness(0.5).hex(),
						WebkitUserSelect: "none"
					}}>Status: {stepMessage}{step < 6 ? "..." : "!"}</Paragraph>
					<Layout style={{
						width: "200px",
						position: "relative",
						transform: "translate(300px, 70px)"
					}}>
						<Button style={{
							backgroundColor: step < 6 ? color(HIGHLIGHT_COLOR).saturation(0.2).hex() : HIGHLIGHT_COLOR,
							color: "#fff"
						}} disabled={step < 6} onClick={() => nav("/bfc-downloader")}>Continue</Button>
					</Layout>
				</Content>
			</Layout>
		</Space>
	</div>;
}