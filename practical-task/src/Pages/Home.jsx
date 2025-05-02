import { useSelector } from "react-redux"
import Navbar from "../components/Navbar";

const Home = () => {
    const user = useSelector((state) => state.user.userData);

    return(
        <>
            <Navbar />
            <div className="home-container">
                <h2>  Welcome, {user?.name}! 🎉 We're glad to see you. Let’s get started!</h2>
            </div>
            
        </>
    )
}

export default Home;