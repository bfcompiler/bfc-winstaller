import { Layout, Typography, Image } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

import { HIGHLIGHT_COLOR } from '../ColorScheme';


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
		<Image src=""></Image>
	</Header>
}