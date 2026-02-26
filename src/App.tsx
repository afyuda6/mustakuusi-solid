import {type Component, onMount} from "solid-js";
import {Router, Route} from "@solidjs/router";
import {Marquee} from "./components/Marquee/Marquee";
import {Footer} from "./components/Footer/Footer";
import {HomePage} from "./pages/HomePage";
import {GamePage} from "./pages/GamePage";
import {CharacterPage} from "./pages/CharacterPage";
import {PrivacyPolicyPage} from "./pages/PrivacyPolicyPage";
import {EmptyPage} from "./pages/EmptyPage";
import styles from "./App.module.css";

export const App: Component = () => {
    onMount(() => {
        if (window.location.hash) {
            const id = window.location.hash.slice(1);
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({behavior: "smooth"});
        }
    });

    return (
        <div class={styles.App}>
            <Marquee/>
            <Router base="/b">
                <Route path="/" component={HomePage}/>
                <Route path="/:id" component={GamePage}/>
                <Route path="/character/:id" component={CharacterPage}/>
                <Route path="/privacy-policy/:id" component={PrivacyPolicyPage}/>
                <Route path="*" component={EmptyPage}/>
            </Router>
            <Footer/>
        </div>
    );
};
