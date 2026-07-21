import { useNavigate } from "react-router-dom";
import "./Home.css";

import MenuButtons from "./components/MenuButtons";
import HomeStats from "./components/HomeStats";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">

            <header className="header">
                <h1>Discgolf App</h1>
            </header>


            <main className="menu">
                <MenuButtons />
            </main>

            <HomeStats />

        </div>
    );
}