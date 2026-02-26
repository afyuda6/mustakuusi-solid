import {type Component, onMount} from "solid-js";
import {useParams} from "@solidjs/router";
import {Navbar} from "../components/Navbar/Navbar";
import {Hero} from "../components/Hero/Hero";
import {About} from "../components/About/About";
import {Characters} from "../components/Characters/Characters";
import {Screenshots} from "../components/Screenshots/Screenshots";
import {Contact} from "../components/Contact/Contact";
import characters from "../../../public/data/characters.json";
import games from "../../../public/data/games.json";

interface CharacterData {
    id: string;
    name: string;
    imageSrc: string;
    description: string;
}

interface GameData {
    id: string;
    title: string;
    imageSrc: string;
    date: string;
    description: string;
    categories: string[];
    detail: string;
    downloadLink: string;
    playLink: string;
    longDescription: string;
    privacyPolicyLink: string;
    screenshots: string[];
    characters: string[];
}

export const GamePage: Component = () => {
    const {id} = useParams();
    const game = (games as GameData[]).find((p) => p.id === id);

    if (!game) {
        return <div></div>;
    }

    const filteredCharacters = (characters as CharacterData[]).filter((c) =>
        game.characters.includes(c.id)
    );

    onMount(() => {
        document.title = `${game.title} | mustakuusi`;
    });

    return (
        <div>
            <Navbar/>
            <Hero
                title={game.title}
                description={game.description}
                downloadLink={game.downloadLink}
                playLink={game.playLink}
                imageUrl={game.imageSrc}
                date={game.date}
            />
            <About
                about="Tentang Gim"
                itemDescription={game.longDescription}
                privacyPolicyLink={game.privacyPolicyLink}
            />
            <Characters characterSection="Karakter di Gim" characters={filteredCharacters}/>
            <Screenshots
                screenshots={game.screenshots}
                title={game.title}
            />
            <Contact/>
        </div>
    );
};
