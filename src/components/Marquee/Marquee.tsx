import styles from "./Marquee.module.css";
import type {Component} from "solid-js";

export const Marquee: Component = () => {
    return (
        <div class={styles.container}>
            <p class={styles.text}>Halo, selamat datang di mustakuusi! Yuk, jelajahi dan temukan hal seru di sini!</p>
        </div>
    );
}