import {type Component, createSignal, For, onCleanup, onMount} from "solid-js";
import {A} from "@solidjs/router";
import {createInView} from "../../hooks/useInView";
import styles from "./GameCard.module.css";
import {getImageUrl} from "../../utils";

interface GameProps {
    title: string;
    imageSrc: string;
    date: string;
    description: string;
    categories: string[];
    detail: string;
    downloadLink: string;
    playLink: string;
}

interface GameCardProps {
    game: GameProps;
}

export const GameCard: Component<GameCardProps> = (props) => {
    const {ref, isVisible} = createInView(0.18);
    const [countdown, setCountdown] = createSignal("");

    let timer: number;

    const updateCountdown = () => {
        if (!props.game.date) return;

        const now = new Date().getTime();
        const release = new Date(props.game.date).getTime();
        const diff = release - now;

        if (diff <= 0) {
            setCountdown("");
            clearInterval(timer);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        setCountdown(`${days} hari lagi`);
    };

    onMount(() => {
        if (props.game.date) {
            updateCountdown();
            timer = setInterval(updateCountdown, 1000 * 60 * 60);
        }
    });

    onCleanup(() => clearInterval(timer));

    return (
        <div ref={ref} class={`${styles.container} ${styles.fadeUp} ${isVisible() ? styles.visible : ""}`}>
            <div class={styles.card}>
                <img src={getImageUrl(props.game.imageSrc)} alt={`Image of ${props.game.title}`} class={styles.image}/>
                <h3 class={styles.title}>
                    <A
                        href={props.game.detail}
                        onClick={() => {
                            const html = document.documentElement;
                            html.style.scrollBehavior = "auto";

                            requestAnimationFrame(() => {
                                window.scrollTo(0, 0);
                                requestAnimationFrame(() => {
                                    html.style.scrollBehavior = "smooth";
                                });
                            });
                        }}
                    >{props.game.title}</A>
                </h3>
                <time class={styles.date}
                      dateTime={props.game.date}>Dirilis: {new Date(props.game.date).toLocaleDateString("id-ID", {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                })} WIB</time>
                <ul class={styles.categories}>
                    <For each={props.game.categories}>
                        {(category) => <li class={styles.category}>{category}</li>}
                    </For>
                </ul>
                <div class={styles.links}>
                    {countdown() && (
                        <h2 class={styles.badge}>{countdown()}</h2>
                    )}
                    {!countdown() && props.game.downloadLink && (
                        <a href={props.game.downloadLink} target="_blank" rel="noopener"><img
                            src={getImageUrl("googlebadge.png")}
                            alt="Unduh di Google Play"
                            class={styles.badge}
                        /></a>)}
                    {!countdown() && props.game.playLink && (
                        <a href={props.game.playLink} target="_blank" rel="noopener"><img
                            src={getImageUrl("itchbadge.png")}
                            alt="Main di itch.io"
                            class={styles.badge}
                        /></a>)}
                </div>
            </div>
        </div>
    )
}