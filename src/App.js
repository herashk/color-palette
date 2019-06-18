import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import { Route, Switch } from "react-router-dom";
import { generateColorPalette } from './helpers/helpers';

class App extends React.Component {
  findPalette(id) {
    return seedColors.find((palette) => palette.id === id );
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <PaletteList palettes={seedColors} />}/>
        <Route 
          exact 
          path="/palette/:id" 
          render={(routeProps) => (<Palette palette={generateColorPalette(this.findPalette(routeProps.match.params.id))} />)}
        />
      </Switch>


      // <div className="App">
      //   <Palette palette={generateColorPalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
