import type {Component} from "solid-js";
import styles from "./Contact.module.css";
import {getImageUrl} from "../../utils.ts";

export const Contact: Component = () => {
    return (
        <footer class={styles.container} id="contact">
            <div class={styles.text}>
                <h2>Kontak</h2>
            </div>
            <ul class={styles.links}>
                <li class={styles.link}>
                    <img src={getImageUrl("emailIcon.png")} alt="email icon"/>
                    <a href="mailto:mustakuusi6@gmail.com">mustakuusi6@gmail.com</a>
                </li>
                <li class={styles.link}>
                    <img src={getImageUrl("linkedinIcon.png")} alt="linkedin icon"/>
                    <a href="https://www.linkedin.com/company/mustakuusi" target="_blank" rel="noopener">linkedin.com/company/mustakuusi</a>
                </li>
            </ul>
        </footer>
    )
}