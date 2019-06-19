import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/SingleColorPaletteStyles';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex'
        };
        // don't need to add states since we won't be changing them
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
        this.changeColorFormat = this.changeColorFormat.bind(this);
    }

    changeColorFormat(val) {
        this.setState({ format: val });
    }

    gatherShades(palette, colorToLookFor) {
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(allColors[key].filter(color => color.id === colorToLookFor));
        }
        return shades.slice(1);
    }

    render() {
        const { format } = this.state;
        const { classes } = this.props;
        const { paletteName, emoji, id } = this.props.palette;
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.hex} 
                name={color.name} 
                background={color[format]} 
                showingFullPalette={false} 
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar 
                    changeColorFormat={this.changeColorFormat}
                    showAllColors={false}
                />
                <div className={classes.paletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className={classes.backButton}>GO BACK TO PALETTE</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);
