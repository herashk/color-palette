import sizes from './sizes';

export default {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    paletteColors: {
        height: "90%"
    },
    goBack: {
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-4px",
        textTransform: "uppercase",
        backgroundColor: "black",
        opacity: 1,
        [sizes.down("lg")]: {
            width: "25%",
            height: "33.3333%"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "20%"
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: "10%"
        }
    },
    backButton: {
        width: "160px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-80px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "0.7rem",
        color: "white",
        border: "none",
        textDecoration: "none",
        lineHeight: "30px"
    },
}