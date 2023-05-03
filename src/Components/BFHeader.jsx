// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

import { HIGHLIGHT_COLOR } from '../ColorScheme';
import GithubIcon from './GithubIcon';

export default function BFHeader() {
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
		<GithubIcon link="https://github.com/bfcompiler/bfc-winstaller" project="bfc-winstaller" size="65px" style={{
			top: "20px",
			right: "20px",
		}} />
	</Header>
}