// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Space, Typography, Button, Progress, Tooltip } from 'antd';
import color from 'onecolor';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

import tf from '../Tauri';
import { HIGHLIGHT_COLOR, BACKGROUND_COLOR } from '../ColorScheme';
import GITHUB_ICON_BLACK from '../../assets/images/github-icon.png';
import GITHUB_ICON_WHITE from '../../assets/images/github-icon-white.png';
import CONSTANTS from '../Constants';
import BFHeader from '../Components/BFHeader';

export default function BFCDownloader() {
	const nav = useNavigate();
	const adpath = useSelector(state => state.appdata.path);
	const [step, setStep] = React.useState(0);
	const [stepMessage, setStepMessage] = React.useState("Querying bfc-win Releases");
	const [hoveringGithub, setHoveringGithub] = React.useState(false);

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

	const isBfcSetup = useSelector(state => state.setupBfc.complete);
	React.useEffect(() => {
		if (isBfcSetup) {
			setStep(5);
		}
	}, [isBfcSetup]);

	const deletedFile = useSelector(state => state.deleteFile.file);
	const deleteComplete = useSelector(state => state.deleteFile.complete);
	React.useEffect(() => {
		if (deletedFile == adpath + "\\bfc.zip" && deleteComplete) {
			setStep(4);
			tf.setup_bfc(adpath);
		}
	}, [deleteComplete, deletedFile, adpath]);

	const unzippedFile = useSelector(state => state.unzipFile.file);
	const unzipComplete = useSelector(state => state.unzipFile.complete);
	React.useEffect(() => {
		if (unzippedFile == adpath + "\\bfc.zip" && unzipComplete) {
			setStep(3);
			tf.delete_path(adpath + "\\bfc.zip");
		}
	}, [unzipComplete, unzippedFile, adpath]);

	const downloadedFile = useSelector(state => state.downloadedFile.file);
	const downloadComplete = useSelector(state => state.downloadedFile.complete);
	React.useEffect(() => {
		if (downloadedFile == adpath + "\\bfc.zip" && downloadComplete) {
			setStep(2);
			tf.unzip_file(adpath + "\\bfc.zip", adpath + "\\bfc");
		}
	}, [downloadedFile, downloadComplete, adpath]);

	const [bfcURL, setBfcURL] = React.useState("");
	const rawUrlContents = useSelector(state => state.urlContents.contents);
	const selectedUrl = useSelector(state => state.urlContents.url);
	React.useEffect(() => {
		if (selectedUrl == CONSTANTS['BFC_DATA_URL'] && bfcURL == "") {
			let parsed = JSON.parse(rawUrlContents);
			let assets = parsed[0].assets;
			for (let i = 0; i < assets.length; i++) {
				if (assets[i].name.indexOf("x86_64") > -1 && assets[i].name.indexOf("msvc") > -1) {
					setStep(1);
					tf.download_to_from_url(assets[i].browser_download_url, adpath + "\\bfc.zip");
					setBfcURL(assets[i].browser_download_url);
				}
			}
		}
	}, [rawUrlContents, selectedUrl, bfcURL]);

	React.useEffect(() => {
		tf.get_url_contents(CONSTANTS['BFC_DATA_URL']);
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
					}}>Downloading bfc-win
						<div style={{
							userSelect: "none"
						}}>
							<Tooltip title={<span style={{
								userSelect: "none"
							}}>Go to github for Brainf**k Compiler</span>}>
								<img style={{
									display: "inline",
									width: "48px",
									height: "auto",
									transform: "translate(5px, 12px)",
									cursor: "pointer"
								}} src={hoveringGithub ? GITHUB_ICON_WHITE : GITHUB_ICON_BLACK}
									onMouseEnter={() => setHoveringGithub(true)}
									onMouseLeave={() => setHoveringGithub(false)}
									onClick={() => tf.open_link_in_default_browser("https://github.com/bfcompiler/bfc")} />
							</Tooltip>
						</div>
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