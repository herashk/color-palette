import React from 'react'
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "0.5rem",
        position: 'relative',
        overflow: "hidden",
        "&:hover": {
            cursor: "pointer"
        }
    },
    colors: {
        backgroundColor: "grey"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    }
};


function MiniPalette(props) {
    // inside props will have classes attribute
    // inside classes, there will be main, making a unique classname that pertains to this component
    const { classes, paletteName, emoji } = props; // no this.props since we are inside a functinal component
    return (
        <div className={classes.root}>
        <div className={classes.colors}>

        </div>
        <h5 className={classes.title}>{paletteName} 
            <span className={classes.emoji}>{emoji}</span>
        </h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);