import React, { Component } from 'react'
import Slider, { Range } from 'rc-slider';
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
        const colorBoxes = this.props.palette.colors[this.state.level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ));
        return (
            <div className="Palette">
                {/* Navbar  */}
                <Slider 
                    defaultValue={this.state.level} 
                    min={100} 
                    max={900} 
                    step={100}
                    onAfterChange={this.changeLevel}
                />
                <div className="Palette-Colors">
                  {colorBoxes}
                </div>
            </div>
        )
    }
}
