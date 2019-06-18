import React, { Component } from 'react'
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';

const styles = {
    root: {
        backgroundColor: "#101031",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        "& h1": {
            fontWeight: "400"
        }
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gridGap: "5%"
    }
}

class PaletteList extends Component {
    render() {
        const { palettes, classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>COLOR PALETTE OPTIONS</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                             <MiniPalette {...palette} />
                         ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);