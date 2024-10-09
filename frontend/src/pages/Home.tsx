import MessageContainer from "../components/messages/MessageContainer";
import Setting from "../components/sidebar/Setting";
import Sidebar from "../components/sidebar/Sidebar";
import { useLocation } from 'react-router-dom';

const Home = () => {
	const location = useLocation();
	console.log(location)
	return (
		<div className='flex h-[80vh] w-full  rounded-lg overflow-hidden bg-clip-padding glass'>
			<Sidebar />
			{location.search === '?update' ? <Setting /> : <MessageContainer />}
		</div>
	);
};
export default Home;
