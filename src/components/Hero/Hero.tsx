import type {Component} from "solid-js";
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
}

export const Hero: Component<HeroProps> = (props) => {
    const {ref, isVisible} = createInView(0.18);

    const location = useLocation();

    const BASE_PATH = "/solid";
    const path = location.pathname.startsWith(BASE_PATH)
        ? location.pathname.slice(BASE_PATH.length) || "/"
        : location.pathname;

    const isHomePage = path === "/";
    const isCharacterPage = path.startsWith("/character/");
    const isGamePage = (path !== "/") && !isCharacterPage;

    return (
        <section ref={ref} class={`${styles.container} ${styles.fadeUp} ${isVisible() ? styles.visible : ""}`}>
            <div class={styles.content}>
                <h1 class={styles.title}>{props.title}</h1>
                <p class={styles.description}>{props.description}</p>
                {isHomePage && (
                    <a href="#games" class={styles.gameBtn} onClick={() => {
                        setTimeout(() => {
                            history.replaceState(null, '', window.location.pathname);
                        }, 200);
                    }}>Cari Gim</a>
                )}
                {isGamePage && (
                    <div class={styles.buttonGroup}>
                        {props.downloadLink && (
                            <a href={props.downloadLink} target="_blank" rel="noopener"><img
                                src={getImageUrl("googlebadge.png")}
                                alt="Unduh di Google Play"
                                class={styles.badge}
                            /></a>)}
                        {props.playLink && (
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