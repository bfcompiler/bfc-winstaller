// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { Tooltip } from 'antd';

import GITHUB_ICON_BLACK from '../../assets/images/github-icon.png';
import GITHUB_ICON_WHITE from '../../assets/images/github-icon-white.png';
import { open_link_in_default_browser } from '../Tauri';

export default function GithubIcon(props) {
	const [hovering, setHovering] = React.useState(false);
	return <span style={{
		userSelect: "none"
	}}>
		<Tooltip title={<span style={{
			userSelect: "none"
		}}>Go to github for {props.project}</span>} placement="left">
			<img src={hovering ? GITHUB_ICON_WHITE : GITHUB_ICON_BLACK} style={{
				position: "absolute",
				width: props.size,
				height: "auto",
				cursor: "pointer",
				userSelect: "none",
				...props.style
			}}
			draggable={false}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
			onClick={() => open_link_in_default_browser(props.link)} />
		</Tooltip>
	</span>;
}