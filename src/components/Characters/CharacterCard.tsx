import type {Component} from "solid-js";
import {A} from "@solidjs/router";
import {createInView} from "../../hooks/useInView";
import styles from "./CharacterCard.module.css";
import {getImageUrl} from "../../utils";

interface CharacterProps {
    id?: string;
    name: string;
    imageSrc: string;
    description: string;
}

interface CharacterCardProps {
    character: CharacterProps,
    className?: any
}

export const CharacterCard: Component<CharacterCardProps> = ({
                                                                 character: {id, name, imageSrc},
                                                                 className
                                                             }: CharacterCardProps) => {
    const {ref, isVisible} = createInView(0.18);

    return (
        <div ref={ref} class={`${styles.container} ${styles.fadeUp} ${isVisible() ? styles.visible : ""} ${className || ""}`}>
            <div class={styles.card}>
                <div class={styles.imagecon}>
                    <img src={getImageUrl(imageSrc)} alt={`Image of ${name}`} class={styles.image}/>
                </div>
                <A
                    href={`/character/${id}`}
                    class={styles.title}
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
                >{name}</A>
            </div>
        </div>
    )
}