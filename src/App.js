import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { Route, Switch } from "react-router-dom";
import { generateColorPalette } from './helpers/helpers';

class App extends React.Component {
  findPalette(id) {
    return seedColors.find((palette) => palette.id === id );
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <h1>palette list goes here</h1>}/>
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
