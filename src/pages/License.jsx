// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Space, Typography, Button, Modal } from 'antd';
import color from 'onecolor';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

import { HIGHLIGHT_COLOR, BACKGROUND_COLOR } from '../ColorScheme';

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

export default function LicensePage() {
	const nav = useNavigate();
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	let LICENSE_ARRAY = `MIT License

Copyright (c) 2023 Jacob Allen Morris

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`.split("\n");
	let LICENSE = [];
	for (let i = 0; i < LICENSE_ARRAY.length; i++) {
		LICENSE.push(<span><HoverText>{LICENSE_ARRAY[i]}</HoverText><br style={{ WebkitUserSelect: "none" }} /></span>);
	}

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
					<Layout style={{
						top: "25px",
						left: "50px",
						width: "700px",
						height: "350px",
						position: "relative",
						overflowY: "scroll"
					}}>
						<Paragraph>{LICENSE}</Paragraph>
					</Layout>
					<Layout style={{
						width: "200px",
						position: "relative",
						transform: "translate(300px, 70px)"
					}}>
						<Button style={{
							backgroundColor: HIGHLIGHT_COLOR,
							color: "#fff"
						}} onClick={() => setIsModalOpen(true)}>Accept License</Button>
					</Layout>
				</Content>
			</Layout>
			<Modal title="Accept License" open={isModalOpen} okText="Yes" okButtonProps={{
				style: {
					backgroundColor: HIGHLIGHT_COLOR
				}
			}} cancelText="No" onOk={() => nav("/warning")} onCancel={() => setIsModalOpen(false)}>
				Are you sure you accept the MIT License?
			</Modal>
		</Space>
	</div>;
}