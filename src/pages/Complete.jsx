// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Space, Typography, Button } from 'antd';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

import tf from '../Tauri';
import { HIGHLIGHT_COLOR, BACKGROUND_COLOR } from '../ColorScheme';
import BFHeader from '../Components/BFHeader';

export default function CompletePage() {
	const [adpath, setAdpath] = React.useState("");

	React.useEffect(() => {
		tf.generate_appdata().then(payload => {
			setAdpath(payload);
		});
	}, []);

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
					}}>Complete!</Title>
					<Layout style={{
						top: "25px",
						left: "50px",
						width: "700px",
						height: "250px",
						position: "relative"
					}}>
						<Paragraph style={{
							overflowY: "scroll"
						}}>
							<span style={{ userSelect: "none" }}>Copy the following to your PATH variable:<br/></span>
							{adpath}<span style={{ userSelect: "none" }}><br/><br/><br/></span>
							<span style={{ userSelect: "none" }}>You can add to your PATH variable by using windows search, typing "Edit System" and clicking on<br/>
							"Edit the system environment variables" and double clicking the button in the bottom right called<br/>
							"Environment Variables", under the section "User Variables for {"<"}YOUR ACCOUNT{">"}",<br/>
							Clicking on the item "Path", clicking "New" in the window that pops up<br/>
							and pasting the value supplied. Now from any newly opened terminal <br/>
							you can use the command "bfc"</span>
						</Paragraph>
					</Layout>
					<Layout style={{
						width: "200px",
						position: "relative",
						transform: "translate(300px, 70px)"
					}}>
						<Button style={{
							backgroundColor: HIGHLIGHT_COLOR,
							color: "#fff"
						}} onClick={() => tf.exit_process()}>Complete</Button>
					</Layout>
				</Content>
			</Layout>
		</Space>
	</div>;
}