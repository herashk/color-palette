import React, { Component } from 'react'
import Slider from 'rc-slider';
import ColorBox from './ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500
        };
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel });
    }

    render() {
        // the [100], [200] values will change with a slider
        const { colors } = this.props.palette;
        const { level } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ));
        return (
            <div className="Palette">
                {/* Navbar  */}
                <div className="slider">
                    <Slider 
                        defaultValue={level} 
                        min={100} 
                        max={900} 
                        step={100}
                        onAfterChange={this.changeLevel}
                    />
                </div>
                <div className="Palette-Colors">
                  {colorBoxes}
                </div>
            </div>
        )
    }
}
