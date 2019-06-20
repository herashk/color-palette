import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import { Route, Switch } from "react-router-dom";
import { generateColorPalette } from './helpers/helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './Page';

class App extends React.Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => palette.id === id );
  }

  savePalette(newPalette) {
    // concatenating newPalette to the existing palettes in the state
    this.setState({ palettes: [...this.state.palettes, newPalette ]}, this.syncLocalStorage);
  }

  deletePalette(id) {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id ) }), 
      this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames="fade" timeout={500} key={location.key}> 
              {/* passing in location and using location.key is important */}
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={(routeProps) => 
                    <Page>
                      <NewPaletteForm palettes={this.state.palettes} savePalette={this.savePalette} {...routeProps} 
                      />
                    </Page>
                  }
                />
                <Route 
                  exact 
                  path="/" 
                  render={(routeProps) => 
                    <Page>
                      <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps} 
                      />
                    </Page>
                  }
                />
                <Route 
                  exact 
                  path="/palette/:paletteId" 
                  render={(routeProps) => 
                    <Page>
                      <Palette palette={generateColorPalette(this.findPalette(routeProps.match.params.paletteId))} />
                    </Page>
                  }
                />
                <Route 
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={(routeProps) => 
                    <Page>
                      <SingleColorPalette palette={generateColorPalette(this.findPalette(routeProps.match.params.paletteId))} colorId={routeProps.match.params.colorId } />
                    </Page>
                  }
                />
                <Route 
                  render={(routeProps) => 
                    <Page>
                      <PaletteList deletePalette={this.deletePalette} palettes={this.state.palettes} {...routeProps} 
                      />
                    </Page>
                  }
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
