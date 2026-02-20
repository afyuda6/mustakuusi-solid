import {type Component, For} from "solid-js";
import {ScreenshotCard} from "./ScreenshotCard";
import styles from "./Screenshots.module.css";

interface ScreenshotsProps {
    screenshots: string[];
    title: string;
}

export const Screenshots: Component<ScreenshotsProps> = (props) => {
    return (
        <section class={styles.container} id="screenshots">
            <h2 class={styles.title}>Cuplikan</h2>
            <div class={styles.screenshots}>
                <For each={props.screenshots}>
                    {(src) => <ScreenshotCard imageSrc={src} title={props.title} />}
                </For>
            </div>
        </section>
    );
};