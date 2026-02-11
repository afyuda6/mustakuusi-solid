import {type Component, onMount} from "solid-js";
import {useParams} from "@solidjs/router";
import {Navbar} from "../components/Navbar/Navbar";
import {Privacy} from "../components/Privacy/Privacy";
import {Contact} from "../components/Contact/Contact";
import games from "../../../public/data/games.json";

export const PrivacyPolicyPage: Component = () => {
    const {id} = useParams();
    const game = games.find((p) => p.id === id);

    if (!game) {
        return <div></div>;
    }

    onMount(() => {
        document.title = `${game.title} | mustakuusi`;
    });

    return (
        <div>
            <Navbar/>
            <Privacy
                id={id}
                title={game.title}/>
            <Contact/>
        </div>
    );
};