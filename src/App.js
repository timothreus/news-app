import React, { Component } from 'react';
import './App.css';
import Country from './Country'
import { List } from 'immutable'

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      availableContinents: List(["Asia", "Europe"]),
      selectedContinent: "Europe",
      availableCountries: List(["Germany", "Romania", "UK"]),
      selectedCountry: "UK",
      feed: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk',
      // availableLanguages: List(["EN-UK"]),
      // selectedLanguage: "EN-UK",
      articles: []
    };
    this.handleContinentChange = this.handleContinentChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  handleCountryChange(event) {
    const clickOnCountry = event.target.value
    const feed = this.getFeedFromCountry(clickOnCountry)
    this.setState({
      selectedCountry: clickOnCountry,
      feed: feed
    })
  }

  handleContinentChange(event) {
    const clickOnContinent = event.target.value

    let countryList = List([])
    switch (clickOnContinent) {
      case "Asia":
        countryList = List(["Bhutan", "China"])
        break
      case "Europe":
        countryList = List(["Germany", "Romania", "UK"])
        break
      default:
        break
    }

    const feed = this.getFeedFromCountry(countryList.first())

    this.setState({
      selectedContinent: clickOnContinent,
      availableCountries: countryList,
      selectedCountry: countryList.first(),
      feed: feed

    })
  }
  getFeedFromCountry(country) {
    let feed = ""
    switch (country) {
      case "Romania":
        feed = 'http://www.romania-insider.com/feed/atom/' //'https://www.digi24.ro/rss'
        break
      case "UK":
        feed = 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk'
        break
      case "Germany":
        feed = 'http://www.spiegel.de/international/index.rss'
        break
      case "China":
        feed = 'http://feeds.bbci.co.uk/zhongwen/simp/rss.xml'
        break
      case "Bhutan":
        feed = 'http://www.kuenselonline.com/feed/'
        break
      default:
        break
    }
    console.log("returning the feed: " + feed)
    return feed
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">News</h1>

          <select id="continent-select" onChange={this.handleContinentChange}>
            {this.state.availableContinents.map(element => {
              if (element === this.state.selectedContinent) {
                return <option selected value={element}>{element}</option>
              } else {
                return <option value={element}>{element}</option>
              }
            })}
          </select>

          <select id="country-select" onChange={this.handleCountryChange}>
            {this.state.availableCountries.map(element => {
              if (element === this.state.selectedCountry) {
                return <option selected value={element}>{element}</option>
              } else {
                return <option value={element}>{element}</option>
              }
            })}
          </select>

          {/* <select id="language-select">
            {this.state.availableLanguages.map(element => {
              if (element === this.state.selectedLanguage) {
                return <option selected value={element}>{element}</option>
              } else {
                return <option value={element}>{element}</option>
              }
            })}
          </select> */}

        </header>

        <Country name={this.state.selectedCountry} feed={this.state.feed} />




      </div>
    );
  }
}

export default App;
