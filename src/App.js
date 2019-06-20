import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { Route, Switch } from "react-router-dom";
import { generateColorPalette } from './helpers/helpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => palette.id === id );
  }

  savePalette(newPalette) {
    // concatenating newPalette to the existing palettes in the state
    this.setState({ palettes: [...this.state.palettes, newPalette ]}, this.syncLocalStorage);

  }

  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => <NewPaletteForm palettes={this.state.palettes} savePalette={this.savePalette} {...routeProps} />}
        />
        <Route 
          exact 
          path="/" 
          render={(routeProps) => (<PaletteList palettes={this.state.palettes} {...routeProps} />)}
        />
        <Route 
          exact 
          path="/palette/:paletteId" 
          render={(routeProps) => (<Palette palette={generateColorPalette(this.findPalette(routeProps.match.params.paletteId))} />)}
        />
        <Route 
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => (<SingleColorPalette palette={generateColorPalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId } />)}
        />
      </Switch>


      // <div className="App">
      //   <Palette palette={generateColorPalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
