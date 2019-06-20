import sizes from './sizes';
import bg from './bg.svg';

export default {
    "@global": { // a way to define a global style
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        }
    },
    root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        /* background by SVGBackgrounds.com */
        backgroundColor: "#ffffff",
        backgroundImage: `url(${bg})`,
        overflow: "scroll",
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
        [sizes.down("xl")]: {
            width: "80%",
        },
        [sizes.down("xs")]: {
            width: "75%",
        },
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "rgb(0, 0, 0, 0.5)",
        alignItems: "center",
        "& h1": {
            fontWeight: "400"
        },
        "& a": {
            color: "rgb(0, 0, 0, 0.5)",
            // textDecoration: "none"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gridGap: "1.5rem",
        [sizes.down("xs")]: {
            gridTemplateColumns: "repeat(1, 100%)"
        },
        [sizes.down("md")]: {
            gridTemplateColumns: "repeat(2, 50%)"
        },

    }
}