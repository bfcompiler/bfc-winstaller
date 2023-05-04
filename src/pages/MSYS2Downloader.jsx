// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { Layout, Space, Typography, Progress, Button } from 'antd';
import color from 'onecolor';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

import { HIGHLIGHT_COLOR, BACKGROUND_COLOR } from '../ColorScheme';
import tf from '../Tauri';
import CONSTANTS from '../Constants';
import BFHeader from '../Components/BFHeader';


function getDownloadUrl(urlContents) {
	let parsed = JSON.parse(urlContents);
	let assets = parsed[0].assets;
	for (let i = 0; i < assets.length; i++) {
		if (assets[i].name.endsWith(".tar.xz")) {
			return assets[i].browser_download_url;
		}
	}
}

export default function MSYS2DownloaderPage() {
	const nav = useNavigate();
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

	React.useEffect(async () => {
		let appdata = await tf.generate_appdata();
		let urlContents = await tf.get_url_contents(CONSTANTS['MSYS2_DATA_URL']);
		let downloadUrl = getDownloadUrl(urlContents);
		setStep(1);
		await tf.download_to_from_url(downloadUrl, appdata + "\\msys2.tar.xz");
		setStep(2);
		await tf.extract_tar_xz(appdata + "\\msys2.tar.xz", appdata);
		setStep(3);
		await tf.delete_path(appdata + "\\msys2.tar.xz");
		setStep(4);
		await tf.setup_msys2(appdata + "\\msys64\\msys2_shell.cmd");
		setStep(5);
		await tf.run_bash_command(appdata + "\\msys64\\usr\\bin\\bash.exe", "pacman -Sy --noconfirm mingw-w64-x86_64-toolchain");
		setStep(6);
	}, []);

	return <div onContextMenu={e => e.preventDefault()}>
		<Space direction='vertical' style={{ width: "100%", position: "absolute", top: "0px", left: "0px" }} size={"small"}>
			<Layout >
				<BFHeader />
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
					<Progress type="circle" percent={step / 6 * 100} format={percent => {
						return <span style={{
							userSelect: "none"
						}}>{Math.round(percent)}%</span>
					}} />
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