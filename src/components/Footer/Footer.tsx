import styles from "./Footer.module.css";
import type {Component} from "solid-js";

export const Footer: Component = () => {
    return (
        <div class={styles.container}>
            <p class={styles.text}>mustakuusi — lahir dari pikiran yang tak diam.</p>
        </div>
    );
}