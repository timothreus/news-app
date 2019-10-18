import React, { Component } from 'react';
import './App.css';
import Country from './Country'

import { List, Map } from 'immutable'

class App extends Component {
  //TODO get a scrollbar on the modal

  constructor(props) {
    super(props)

    const europe = Map({
      name: "Europe",
      countries: List([
        Map({
          country: "UK",
          feed: /*'https://www.theguardian.com/uk/rss',*/ 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk',
          publisher: 'BBC' //''The Guardian'
        }),
        Map({
          country: "Germany",
          feed: 'http://www.spiegel.de/international/index.rss',//TODO german news not international
          publisher: 'Der Spiegel'
        }),
        Map({
          country: "Romania",
          feed: 'https://www.digi24.ro/rss',
          publisher: 'Digi24'
        }),
        Map({
          country: "France",
          feed: 'http://www.france24.com/en/france/rss',
          publisher: 'France24'
        })

      ])
    })

    const asia = Map({
      name: "Asia",
      countries: List([
        Map({
          country: "Bhutan",
          feed: 'http://www.kuenselonline.com/feed/',
          publisher: 'Kuensel'
        }),

        Map({
          country: "Japan",
          feed: 'http://feeds.thejapannews.net/rss/c4f2dd8ca8c78044',
          publisher: 'The Japan News'
        })

      ])
    })

    const australasia = Map({
      name: "Australasia",
      countries: List([
        Map({
          country: "Australia",
          feed: 'http://www.abc.net.au/radio/programs/the-signal/feed/9443166/podcast.xmls',
          publisher: 'ABC'
          //TODO should be aus news ot international
        })

      ])
    })

    const northAmerica = Map({
      name: "North America",
      countries: List([
        Map({
          country: "US",
          feed: 'https://www.voanews.com/api/zq$omekvi_',  //TODO us news
          publisher: 'VOA'

        })

      ])
    })

    const topics = Map({
      name: "Topics",
      countries: List([
        Map({
          country: "Humour",
          feed: 'https://www.newyorker.com/feed/humor',
          publisher: 'The New Yorker'
        }),
        Map({
          country: "Religion",
          feed: 'https://www.firstthings.com/rss/web-exclusives',
          publisher: 'First Things'
        }),
        Map({
          country: "Sport",
          feed: 'http://www.skysports.com/rss/12040',
          publisher: 'Sky Sports'
        })



      ])
    })



    const allFeeds = List([europe, asia, australasia, northAmerica, topics])

    const availableContinents = allFeeds.map(element => {
      return element.get('name')
    });


    const firstContinentCountries = allFeeds.get(0).get('countries')
    const countriesInFirstContinent = firstContinentCountries.map(element => {
      return element.get('country')
    });

    this.state = {
      allFeeds: allFeeds,
      availableContinents: availableContinents,
      selectedContinent: availableContinents.get(0),
      availableCountries: countriesInFirstContinent,
      selectedCountry: countriesInFirstContinent.get(0),
      feed: firstContinentCountries.get(0).get('feed'),
      publisher: firstContinentCountries.get(0).get('publisher'),
      articles: []
    };
    this.handleContinentChange = this.handleContinentChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  handleCountryChange(event) {
    const clickOnCountry = event.target.value
    const feed = this.getFeedFromCountry(clickOnCountry, this.state.selectedContinent).get("feed")
    const publisher = this.getFeedFromCountry(clickOnCountry, this.state.selectedContinent).get("publisher")

    this.setState({
      selectedCountry: clickOnCountry,
      feed: feed,
      publisher: publisher
    })
  }

  handleContinentChange(event) {
    const clickOnContinent = event.target.value
    const countryFeeds = []
    this.state.allFeeds.forEach(element => {
      if (element.get("name") === clickOnContinent) {
        countryFeeds.push(element.get("countries"))
      }
    })

    const listOfCountries = countryFeeds[0].map(element => {
      return element.get('country')
    })

    const feed = this.getFeedFromCountry(listOfCountries.first(), clickOnContinent).get("feed")
    const publisher = this.getFeedFromCountry(listOfCountries.first(), clickOnContinent).get("publisher")

    this.setState({
      selectedContinent: clickOnContinent,
      availableCountries: listOfCountries,
      selectedCountry: listOfCountries.first(),
      feed: feed,
      publisher: publisher

    })
  }

  getFeedFromCountry(country, continent) {
    const allFeeds = this.state.allFeeds

    const countryFeeds = []
    allFeeds.forEach(element => {
      if (element.get("name") === continent) {
        countryFeeds.push(element.get("countries"))
      }
    })

    const listOfCountriesWithFeeds = countryFeeds[0].map(element => {
      return element
    })

    let feed = ""

    listOfCountriesWithFeeds.forEach(element => {
      if (element.get("country") === country) {
        feed = element//.get("feed") //TODO rename function
      }
    })

    return feed
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">News</h1>


          <select id="continent-select" value={this.state.selectedContinent} onChange={this.handleContinentChange}>
            {this.state.availableContinents.map(element => {
              //TODO find more suitable key
              return <option key={element} value={element}>{element}</option>
            })}
          </select>

          <select id="country-select" value={this.state.selectedCountry} onChange={this.handleCountryChange}>
            {this.state.availableCountries.map(element => {
              //TODO find more suitable key
              return <option key={element} value={element}>{element}</option>
            })}
          </select>

        </header>

        <Country name={this.state.selectedCountry} feed={this.state.feed} publisher={this.state.publisher} />
      </div>
    );
  }
}

export default App;