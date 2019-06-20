import React from 'react'
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import DeleteIcon from "@material-ui/icons/Delete";


class MiniPalette extends React.PureComponent {
    // not rerendering every single time sth changes in the parent state
    // very useful! and this is why arrow functions inline usage might not be efficient
    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    deletePalette(e) {
        e.stopPropagation();
        this.props.openDialog(this.props.id);
    }

    handleClick() {
        this.props.clickToPalette(this.props.id);
    }

    render() {
        // inside props will have classes attribute
        // inside classes, there will be main, making a unique classname that pertains to this component
        const { classes, paletteName, emoji, colors } = this.props; // no this.props since we are inside a functinal component
        const miniColorBoxes = colors.map(color => (
            <div className={classes.miniColor} style={{ backgroundColor: color.color }} key={color.name}></div>
        ))
        return (
            <div className={classes.root} onClick={this.handleClick}>
                <DeleteIcon 
                    className={classes.deleteIcon}
                    onClick={this.deletePalette}
                />
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>{paletteName} 
                <span className={classes.emoji}>{emoji}</span>
            </h5>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);