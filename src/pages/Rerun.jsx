// Copyright (c) 2023 Jacob Allen Morris
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';
import { Layout, Space } from 'antd';

const { Content } = Layout;

import { BACKGROUND_COLOR } from '../ColorScheme';
import BFHeader from '../components/BFHeader';

export default function Rerun() {
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
				}}></Content>
			</Layout>
		</Space>
	</div>;
}