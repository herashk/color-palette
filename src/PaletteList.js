import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {

    clickToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>COLOR PALETTE OPTIONS</h1>
                        <Link to="/palette/new">Create New Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette => (
                             <MiniPalette {...palette} 
                                key={palette.id} 
                                handleClick={() => this.clickToPalette(palette.id)} 
                                deletePalette={deletePalette}
                                id={palette.id}
                            />
                         ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);