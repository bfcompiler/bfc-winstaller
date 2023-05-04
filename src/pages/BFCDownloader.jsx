// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Space, Typography, Button, Progress } from 'antd';
import color from 'onecolor';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

import tf from '../Tauri';
import { HIGHLIGHT_COLOR, BACKGROUND_COLOR } from '../ColorScheme';
import CONSTANTS from '../Constants';
import BFHeader from '../Components/BFHeader';
import GithubIcon from '../Components/GithubIcon';

function getDownloadUrl(urlContents) {
	let parsed = JSON.parse(urlContents);
	let assets = parsed[0].assets;
	for (let i = 0; i < assets.length; i++) {
		if (assets[i].name.endsWith(".zip")) {
			return assets[i].browser_download_url;
		}
	}
}

export default function BFCDownloader() {
	const nav = useNavigate();
	const [step, setStep] = React.useState(0);
	const [stepMessage, setStepMessage] = React.useState("Querying bfc-win Releases");

	React.useEffect(() => {
		switch (step) {
			case 1:
				setStepMessage("Downloading bfc-win");
				break;
			case 2:
				setStepMessage("Unzipping bfc-win");
				break;
			case 3:
				setStepMessage("Deleting unused files");
				break;
			case 4:
				setStepMessage("Setting up bfc-win");
				break;
			case 5:
				setStepMessage("Completed");
				break;
		}
	}, [step]);

	React.useEffect(async () => {
		let appdata = await tf.generate_appdata();
		let urlContents = await tf.get_url_contents(CONSTANTS['BFC_DATA_URL']);
		let downloadUrl = getDownloadUrl(urlContents);
		setStep(1);
		await tf.download_to_from_url(downloadUrl, appdata + "\\bfc.zip");
		setStep(2);
		await tf.unzip_file(appdata + "\\bfc.zip", appdata);
		setStep(3);
		await tf.delete_path(appdata + "\\bfc.zip");
		setStep(4);
		await tf.setup_bfc(appdata);
		setStep(5);
	}, []);

	return <div onContextMenu={e => e.preventDefault()}>
		<Space direction='vertical' style={{ width: "100%", position: "absolute", top: "0px", left: "0px", overflow: "hidden" }} size={"small"}>
			<Layout>
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
					}}>Downloading Brainf**k Compiler
						<GithubIcon link="https://github.com/bfcompiler/bfc" project="Brainf**k Compiler" size="48px" style={{
							transform: "translate(5px, 0px)"
						}} />
					</Title>
					<Paragraph style={{
						WebkitUserSelect: "none"
					}}>Downloading and extracting</Paragraph>
					<Progress type="circle" percent={step / 5 * 100} format={percent => {
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
					}}>Status: {stepMessage}{step < 5 ? "..." : "!"}</Paragraph>
					<Layout style={{
						width: "200px",
						position: "relative",
						transform: "translate(300px, 70px)"
					}}>
						<Button style={{
							backgroundColor: step < 5 ? color(HIGHLIGHT_COLOR).saturation(0.2).hex() : HIGHLIGHT_COLOR,
							color: "#fff"
						}} disabled={step < 5} onClick={() => nav("/complete")}>Continue</Button>
					</Layout>
				</Content>
			</Layout>
		</Space>
	</div>
}