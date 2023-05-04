// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT WARNING.
// https://opensource.org/WARNINGs/MIT

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Space, Typography, Button, Modal } from 'antd';
import color from 'onecolor';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

import { HIGHLIGHT_COLOR, BACKGROUND_COLOR } from '../ColorScheme';
import BFHeader from '../Components/BFHeader';

function HoverText(props) {
	const [hovered, setHovered] = React.useState(false);
	return <span style={{
		color: hovered ? color(HIGHLIGHT_COLOR).lightness(0.6).hex() : "#000",
		cursor: "default",
		WebkitUserSelect: "none"
	}} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
		{props.children}
	</span>;
}

export default function WarningPage() {
	const nav = useNavigate();
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	let WARNING_ARRAY = `This is an installer for github project "bfc-win".
This installer may use up to 500mb of ram due to unpacking of
MSYS2 environment and may use up to 5gb of drive space (although likely much less).
All resources downloaded are available in your localappdata storage in the folder "bfc".
To view simply type "%localappdata%\\bfc" in the location bar of windows explorer.
If you accept this warning, you accept that if you exit this installer mid process it may
ruin the installation of "bfc-win" and may have to delete said "bfc" folder
and will have to completely re-run this installer
Also, it may seem that each step has halted, this is due to how long the install takes
for MSYS2 tooling, do not restart or exit the application, trust the process.
Thanks from the application developer, Jacob Morris
`.split('\n');
	let WARNING = [];
	for (let i = 0; i < WARNING_ARRAY.length; i++) {
		WARNING.push(<span><HoverText>{WARNING_ARRAY[i]}</HoverText><br style={{ WebkitUserSelect: "none" }} /></span>);
	}

	return <div onContextMenu={e => e.preventDefault()}>
		<Space direction='vertical' style={{ width: "100%", position: "absolute", top: "0px", left: "0px", overflow: "hidden" }} size={"small"}>
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
					}}>Warning!</Title>
					<Layout style={{
						top: "25px",
						left: "50px",
						width: "700px",
						height: "250px",
						position: "relative"
					}}>
						<Paragraph style={{
							overflowY: "scroll"
						}}>{WARNING}</Paragraph>
					</Layout>
					<Layout style={{
						width: "200px",
						position: "relative",
						transform: "translate(300px, 70px)"
					}}>
						<Button style={{
							backgroundColor: HIGHLIGHT_COLOR,
							color: "#fff"
						}} onClick={() => setIsModalOpen(true)}>Accept warning</Button>
					</Layout>
				</Content>
			</Layout>
			<Modal 
			title={<span style={{ userSelect: "none" }}>Accept install warning?</span>} 
			open={isModalOpen} 
			okText="Yes" 
			okButtonProps={{
				style: {
					backgroundColor: HIGHLIGHT_COLOR
				}
			}} 
			cancelText="No" 
			onOk={() => nav("/msys2-downloader")} 
			onCancel={() => setIsModalOpen(false)}
			>
				<span style={{
					userSelect: "none"
				}}>
					Are you sure?
				</span>
			</Modal>
		</Space>
	</div>;
}