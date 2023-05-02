// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

import { HIGHLIGHT_COLOR } from '../ColorScheme';
import GITHUB_ICON_BLACK from '../../assets/images/github-icon.png';
import GITHUB_ICON_WHITE from '../../assets/images/github-icon-white.png';
import { open_link_in_default_browser } from '../Tauri';

export default function BFHeader() {
	const [hovering, setHovering] = React.useState(false);

	return <Header style={{
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
		<img src={hovering ? GITHUB_ICON_WHITE : GITHUB_ICON_BLACK} style={{
			position: "absolute",
			top: "20px",
			right: "20px",
			width: "65px",
			height: "auto",
			cursor: "pointer"
		}} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)} onClick={() => open_link_in_default_browser("https://github.com/bfcompiler/bfc-winstaller")} />
	</Header>
}