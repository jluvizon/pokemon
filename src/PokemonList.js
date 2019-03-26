import React, { Component } from "react";
import WildPokemon from "./WildPokemon";
import CatchedPokemon from "./CatchedPokemon";
import * as Constants from "./constants";
import axios from "axios";

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wildPokemons: [],
      catchedPokemons: []
    };
    this.catchPokemon = this.catchPokemon.bind(this);
    this.releasePokemon = this.releasePokemon.bind(this);
    this.fetchWildPokemon = this.fetchWildPokemon.bind(this);
  }

  componentDidMount() {
    let pokemonId = 1;
    this.intervalFetchNewPokemon = setInterval(() => {
      this.fetchWildPokemon(pokemonId);
      pokemonId++;
      if (pokemonId > Constants.MAX_WILD_POKEMONS) {
        clearInterval(this.intervalFetchNewPokemon);
      }
    }, Constants.INTERVAL_TO_FETCH_NEW_POKEMON);
  }

  fetchWildPokemon(pokemonId) {
    axios.get(Constants.GET_POKEMON_URL + pokemonId).then(res => {
      this.state.wildPokemons.push(res.data);
      this.setState({
        wildPokemons: this.state.wildPokemons
      });
    });
  }

  catchPokemon(index) {
    if (this.state.catchedPokemons.length === Constants.MAX_CATCHED_POKEMONS)
      return;

    let catchedPokemon = this.state.wildPokemons[index];
    this.state.catchedPokemons.push(catchedPokemon);
    this.setState(prevState => ({
      wildPokemons: prevState.wildPokemons.filter(
        pokemon => pokemon.id !== catchedPokemon.id
      ),
      catchedPokemons: this.state.catchedPokemons
    }));
  }

  releasePokemon(index) {
    let releasedPokemon = this.state.catchedPokemons[index];
    this.state.wildPokemons.push(releasedPokemon);

    this.setState(prevState => ({
      catchedPokemons: prevState.catchedPokemons.filter(
        pokemon => pokemon.id !== releasedPokemon.id
      ),
      wildPokemons: this.state.wildPokemons.sort((a, b) => a.id - b.id)
    }));
  }

  componentWillUnmount() {
    clearInterval(this.intervalFetchNewPokemon);
  }

  render() {
    const { wildPokemons, catchedPokemons } = this.state;

    return (
      <div className="row">
        <div className="col-5">
          <h1 className="text-center">Wild Pokemons</h1>
          <ul className="row justify-content-center list-unstyled">
            {wildPokemons.map((pokemon, index) => (
              <WildPokemon
                id={index}
                key={pokemon.id}
                pokemon={pokemon}
                onCatchPokemon={this.catchPokemon}
              />
            ))}
          </ul>
        </div>
        <div className="col-2" />
        <div className="col-5">
          <h1 className="text-center">Catched Pokemons</h1>
          <ul className="row list-unstyled">
            {catchedPokemons.map((pokemon, index) => (
              <CatchedPokemon
                id={index}
                key={pokemon.id}
                pokemon={pokemon}
                onReleasePokemon={this.releasePokemon}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PokemonList;
