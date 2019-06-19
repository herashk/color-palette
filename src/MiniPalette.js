import React from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';


function MiniPalette(props) {
    // inside props will have classes attribute
    // inside classes, there will be main, making a unique classname that pertains to this component
    const { classes, paletteName, emoji, colors } = props; // no this.props since we are inside a functinal component
    const miniColorBoxes = colors.map(color => (
        <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name}></div>
    ))
    return (
        <div className={classes.root} onClick={props.handleClick}>
        <div className={classes.colors}>
            {miniColorBoxes}
        </div>
        <h5 className={classes.title}>{paletteName} 
            <span className={classes.emoji}>{emoji}</span>
        </h5>
        </div>
    )
}

export default withStyles(styles)(MiniPalette);