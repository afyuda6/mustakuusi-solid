import {type Component, For} from "solid-js";
import {GameCard} from "./GameCard";
import styles from "./Games.module.css";

interface GameProps {
    id: string;
    title: string;
    imageSrc: string;
    date: string;
    description: string;
    categories: string[];
    detail: string;
    downloadLink: string;
    playLink: string;
}

interface GamesSectionProps {
    gameSection: string;
    games: GameProps[];
}

export const Games: Component<GamesSectionProps> = (props) => {
    return (
        <section class={styles.container} id="games">
            <h2 class={styles.title}>{props.gameSection}</h2>
            <div class={styles.games}>
                <For each={props.games}>
                    {(game) => <GameCard game={game} />}
                </For>
            </div>
        </section>
    )
}