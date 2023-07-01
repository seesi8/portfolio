import styles from "../components/intro.module.css";
import Model from "./model";
import { darken } from "polished";
import { useContext } from "react";
import { ThemeContext } from "../lib/context";

function longShadow(color, total = 4000, dark = 0.00125) {
    let val = `0px 0px ${color}`;
    total = total;
    let amt = 0.125;
    for (var i = 0; i < total; i++) {
        val += `, ${-i}px ${i}px ${darken(amt, color)}`;
        amt += dark;
    }
    return val;
}

export default function Page({}) {
    const { vertical, height, width } = useContext(ThemeContext);
    const aspect_ratio = width / height;

    return (
        <main className={styles.intro}>
            <h1
                style={{
                    textShadow: `${longShadow(
                        "#50C878",
                        vertical ? 20 : 4000,
                        vertical ? 0.029 : 0.0008
                    )}`,
                }}
                className={styles.introName}
            >
                Samuel Liebert Developer{" "}
            </h1>
            <Model
                className={styles.introModel}
                scale={!vertical ? aspect_ratio / 3.5 + 0.5 : 1}
            />
        </main>
    );
}
