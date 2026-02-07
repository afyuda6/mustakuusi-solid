import type {Component} from "solid-js";
import {createInView} from "../../hooks/useInView";
import styles from "./ScreenshotCard.module.css";
import {getImageUrl} from "../../utils.ts";

interface ScreenshotCardProps {
    title: string;
    imageSrc: string;
}

export const ScreenshotCard: Component<ScreenshotCardProps> = (props) => {
    const {ref, isVisible} = createInView(0.18);

    return (
        <div ref={ref} class={`${styles.container} ${styles.fadeUp} ${isVisible() ? styles.visible : ""}`}>
            <img src={getImageUrl(props.imageSrc)} alt={props.title} class={styles.image}/>
        </div>
    )
}