import type {Component} from "solid-js";
import {A, useLocation} from "@solidjs/router";
import {createInView} from "../../hooks/useInView";
import styles from "./About.module.css";

interface AboutProps {
    about: string;
    itemDescription: string;
    privacyPolicyLink?: string;
}

export const About: Component<AboutProps> = (props) => {
    const {ref, isVisible} = createInView(0.18);

    const location = useLocation();

    const BASE_PATH = "/b";
    const path = location.pathname.startsWith(BASE_PATH)
        ? location.pathname.slice(BASE_PATH.length) || "/"
        : location.pathname;

    const isGamePage = path !== "/";

    return (
        <section
            ref={ref}
            class={`${styles.container} ${styles.fadeUp} ${isVisible() ? styles.visible : ""}`}
            id="about"
        >
            <h2 class={styles.title}>{props.about}</h2>
            <div class={styles.content}>
                <ul class={styles.aboutItems}>
                    <li class={styles.aboutItem}>
                        <div class={styles.aboutItemText}>
                            <p>{props.itemDescription}</p>
                            <br/>
                            {isGamePage && props.privacyPolicyLink && (
                                <p>
                                    📄 <A href={props.privacyPolicyLink}
                                         onClick={() => {
                                             const html = document.documentElement;
                                             html.style.scrollBehavior = "auto";

                                             requestAnimationFrame(() => {
                                                 window.scrollTo(0, 0);
                                                 requestAnimationFrame(() => {
                                                     html.style.scrollBehavior = "smooth";
                                                 });
                                             });
                                         }}>Privacy Policy</A>
                                </p>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
};
