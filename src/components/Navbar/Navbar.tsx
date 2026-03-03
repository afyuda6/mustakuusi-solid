import {A, useLocation} from "@solidjs/router";
import {type Component, createSignal, onCleanup, onMount} from "solid-js";
import styles from "./Navbar.module.css";

export const Navbar: Component = () => {
    const [menuOpen, setMenuOpen] = createSignal(false);
    const location = useLocation();

    let navbarRef: HTMLElement;

    const BASE_PATH = "/b";
    const path = location.pathname.startsWith(BASE_PATH)
        ? location.pathname.slice(BASE_PATH.length) || "/"
        : location.pathname;

    const isHomePage = path === "/";
    const isGamePage = path !== "/" && !path.includes("privacy-policy") && !path.includes("character");
    const isCharacterPage = path.startsWith("/character");

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (menuOpen() && navbarRef && !navbarRef.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    onMount(() => {
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        onCleanup(() => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        });
    });

    return (
        <nav class={styles.navbar} ref={(el) => (navbarRef = el)}>
            <A
                href="/"
                class={styles.title}
                onClick={() => {
                    const html = document.documentElement;

                    html.style.scrollBehavior = "auto";
                    window.scrollTo(0, 0);

                    setTimeout(() => {
                        html.style.scrollBehavior = "smooth";
                    }, 50);
                }}
            >mustakuusi</A>
            <div class={styles.menu}>
                <div
                    class={`${styles.burger} ${menuOpen() ? styles.open : ""}`}
                    onClick={() => setMenuOpen(!menuOpen())}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class={`${styles.menuItems} ${menuOpen() ? styles.menuOpen : ""}`}
                    onClick={() => {
                        setMenuOpen(false);
                    }}>
                    {(isHomePage || isGamePage) && (
                        <li>
                            <a href="#about" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("about");
                                if (el) {
                                    el.scrollIntoView({behavior: "smooth"});
                                    setTimeout(() => {
                                        history.replaceState(null, '', window.location.pathname);
                                    }, 600);
                                }
                            }}>Tentang</a>
                        </li>
                    )}
                    {(isHomePage || isCharacterPage) && (
                        <li>
                            <a href="#games" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("games");
                                if (el) {
                                    el.scrollIntoView({behavior: "smooth"});
                                    setTimeout(() => {
                                        history.replaceState(null, '', window.location.pathname);
                                    }, 600);
                                }
                            }}>Gim</a>
                        </li>
                    )}
                    {(isHomePage || isGamePage) && (
                        <li>
                            <a href="#characters" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("characters");
                                if (el) {
                                    el.scrollIntoView({behavior: "smooth"});
                                    setTimeout(() => {
                                        history.replaceState(null, '', window.location.pathname);
                                    }, 600);
                                }
                            }}>Karakter</a>
                        </li>
                    )}
                    {isGamePage && (
                        <li>
                            <a href="#screenshots" onClick={(e) => {
                                e.preventDefault();
                                const el = document.getElementById("screenshots");
                                if (el) {
                                    el.scrollIntoView({behavior: "smooth"});
                                    setTimeout(() => {
                                        history.replaceState(null, '', window.location.pathname);
                                    }, 600);
                                }
                            }}>Cuplikan</a>
                        </li>
                    )}
                    <li>
                        <a href="#contact" onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById("contact");
                            if (el) {
                                el.scrollIntoView({behavior: "smooth"});
                                setTimeout(() => {
                                    history.replaceState(null, '', window.location.pathname);
                                }, 600);
                            }
                        }}>Kontak</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}