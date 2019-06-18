import React, { Component } from 'react'
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: 'hex'
        };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeColorFormat = this.changeColorFormat.bind(this);
    }

    changeLevel(newLevel) {
        this.setState({ level: newLevel });
    }

    changeColorFormat(val) {
        this.setState({ format: val });
    }

    render() {
        // the [100], [200] values will change with a slider
        const { colors } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox background={color[format]} name={color.name} key={`${color[format]} + ${color.name}`}/>
        ));
        return (
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} changeColorFormat={this.changeColorFormat}/>
                <div className="Palette-Colors">
                  {colorBoxes}
                </div>
            </div>
        )
    }
}
