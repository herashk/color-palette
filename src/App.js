import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { Route, Switch } from "react-router-dom";
import { generateColorPalette } from './helpers/helpers';

class App extends React.Component {
  findPalette(id) {
    return seedColors.find((palette) => palette.id === id );
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={() => <NewPaletteForm />}
        />
        <Route 
          exact 
          path="/" 
          render={(routeProps) => (<PaletteList palettes={seedColors} {...routeProps} />)}
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
