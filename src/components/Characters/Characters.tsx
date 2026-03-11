import {type Component, For} from "solid-js";
import {CharacterCard} from "./CharacterCard";
import styles from "./Characters.module.css";

interface CharacterData {
    id: string;
    name: string;
    imageSrc: string;
    description: string;
}

interface CharactersProps {
    characterSection: string;
    characters: CharacterData[];
}

export const Characters: Component<CharactersProps> = (props) => {
    return (
        <section class={styles.container} id="characters">
            <h2 class={styles.title}>{props.characterSection}</h2>
            <div class={styles.characters}>
                <For each={props.characters}>
                    {(character) => <CharacterCard character={character} className={character.id === "lato" ? styles.centered : ""} />}
                </For>
            </div>
        </section>
    );
};
