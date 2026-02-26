import {type Component, createSignal, onCleanup, onMount} from "solid-js";
import {useLocation} from "@solidjs/router";
import {createInView} from "../../hooks/useInView";
import styles from "./Hero.module.css";
import {getImageUrl} from "../../utils.ts";

interface HeroProps {
    title: string;
    description?: string;
    downloadLink?: string;
    playLink?: string;
    imageUrl: string;
    date?: string;
}

export const Hero: Component<HeroProps> = (props) => {
    const {ref, isVisible} = createInView(0.18);

    const location = useLocation();

    const BASE_PATH = "/b";
    const path = location.pathname.startsWith(BASE_PATH)
        ? location.pathname.slice(BASE_PATH.length) || "/"
        : location.pathname;

    const isHomePage = path === "/";
    const isCharacterPage = path.startsWith("/character/");
    const isGamePage = (path !== "/") && !isCharacterPage;

    const [countdown, setCountdown] = createSignal("");

    let timer: number;

    const updateCountdown = () => {
        if (!props.date) return;

        const now = new Date().getTime();
        const release = new Date(props.date).getTime();
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
        if (props.date) {
            updateCountdown();
            timer = setInterval(updateCountdown, 1000 * 60 * 60);
        }
    });

    onCleanup(() => clearInterval(timer));

    return (
        <section ref={ref} class={`${styles.container} ${styles.fadeUp} ${isVisible() ? styles.visible : ""}`}>
            <div class={styles.content}>
                <h1 class={styles.title}>{props.title}</h1>
                <p class={styles.description} innerHTML={props.description}></p>
                {isHomePage && (
                    <a href="#games" class={styles.gameBtn} onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById("games");
                        if (el) {
                            el.scrollIntoView({behavior: "smooth"});
                            setTimeout(() => {
                                history.replaceState(null, '', window.location.pathname);
                            }, 600);
                        }
                    }}>Cari Gim</a>
                )}
                {isGamePage && (
                    <div class={styles.buttonGroup}>
                        {countdown() && (
                            <h2 class={styles.badge}>{countdown()}</h2>
                        )}
                        {!countdown() && props.downloadLink && (
                            <a href={props.downloadLink} target="_blank" rel="noopener"><img
                                src={getImageUrl("googlebadge.png")}
                                alt="Unduh di Google Play"
                                class={styles.badge}
                            /></a>)}
                        {!countdown() && props.playLink && (
                            <a href={props.playLink} target="_blank" rel="noopener"><img
                                src={getImageUrl("itchbadge.png")}
                                alt="Main di itch.io"
                                class={styles.badge}
                            /></a>)}
                    </div>
                )}
            </div>
            <img src={getImageUrl(`${props.imageUrl}`)} alt="hero"
                 class={isCharacterPage ? styles.characterHeroImg : styles.heroImg}/>
        </section>
    )
}