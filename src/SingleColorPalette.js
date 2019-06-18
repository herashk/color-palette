import React, { Component } from 'react'
import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        // don't need to add states since we won't be changing them
        this._shades = this.gatherShades(this.props.palette, this.props.colorId)
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
        const colorBoxes = this._shades.map(color => (
            <ColorBox 
                key={color.hex} 
                name={color.name} 
                background={color.hex} 
                showLink={false} 
            />
        ))
        return (
            <div className="Palette">
                <div className="palette-colors">
                    {colorBoxes}
                </div>
            </div>
        )
    }
}

export default SingleColorPalette;
