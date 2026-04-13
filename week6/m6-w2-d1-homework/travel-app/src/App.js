import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

// Initial data
const COUNTRIES = [
  { country: 'Italy', id: 0, visited: 'Yes', year: '2012' },
  { country: 'Japan', id: 1, visited: 'No', year: '2023' },
  { country: 'Chile', id: 2, visited: 'No', year: '2025' },
];

// Action type
const ADD_COUNTRY = 'ADD_COUNTRY';

// Action creator
function addCountry(country, visited, year) {
  return { type: ADD_COUNTRY, country, visited, year };
}

// Reducer
function Reducer(state = COUNTRIES, action) {
  switch (action.type) {
    case ADD_COUNTRY:
      const newCountry = {
        country: action.country,
        visited: action.visited,
        year: action.year,
        id: state.length,
      };
      return state.concat(newCountry);
    default:
      return state;
  }
}

// Store
const store = createStore(Reducer, COUNTRIES);

// Country functional component
const Country = (props) => {
  return (
    <tr>
      <td>{props.country.country}</td>
      <td>{props.country.visited}</td>
      <td>{props.country.year}</td>
    </tr>
  );
};

// CountriesList functional component
const CountriesList = (props) => {
  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Country</th>
          <th>Visited</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {props.countries.map((c) => (
          <Country key={c.id} country={c} />
        ))}
      </tbody>
    </table>
  );
};

// AddCountry class component
class AddCountry extends React.Component {
  constructor(props) {
    super(props);
    this.setTextInputRef = (inputElement) => {
      if (!inputElement) return;
      switch (inputElement.id) {
        case 'country':
          this.inputCountry = inputElement;
          break;
        case 'visited':
          this.inputVisited = inputElement;
          break;
        case 'year':
          this.inputYear = inputElement;
          break;
        default:
          break;
      }
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.inputCountry.value) return;
    this.props.addCountry(
      this.inputCountry.value,
      this.inputVisited.value,
      this.inputYear.value
    );
    this.inputCountry.value = '';
    this.inputVisited.value = '';
    this.inputYear.value = '';
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="mb-4">
        <div className="form-group">
          <input
            id="country"
            ref={this.setTextInputRef}
            type="text"
            className="form-control mb-2"
            placeholder="Country"
          />
        </div>
        <div className="form-group">
          <input
            id="visited"
            ref={this.setTextInputRef}
            type="text"
            className="form-control mb-2"
            placeholder="Visited (Yes/No)"
          />
        </div>
        <div className="form-group">
          <input
            id="year"
            ref={this.setTextInputRef}
            type="text"
            className="form-control mb-2"
            placeholder="Year"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Country
        </button>
      </form>
    );
  }
}

// Main class component
class Main extends React.Component {
  render() {
    return (
      <div className="container mt-4">
        <h1 className="mb-4">Travel App</h1>
        <AddCountry addCountry={this.props.addCountry} />
        <CountriesList countries={this.props.countries} />
      </div>
    );
  }
}

// Redux connect
const mapStateToProps = (state) => ({ countries: state });
const mapDispatchToProps = (dispatch) => ({
  addCountry: (country, visited, year) =>
    dispatch(addCountry(country, visited, year)),
});

const AppExport = connect(mapStateToProps, mapDispatchToProps)(Main);

const App = () => (
  <Provider store={store}>
    <AppExport />
  </Provider>
);

export default App;
