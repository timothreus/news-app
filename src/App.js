import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import './App.css';
import AllNewsItems from './AllNewsItems'

import { List, Map } from 'immutable'

class App extends Component {
  constructor(props) {
    super(props)

    const english = Map({
      name: "English",
      publications: List([
        Map({
          continent: "Europe",
          country: "UK",
          feed: 'https://www.theguardian.com/uk/rss',
          name: 'The Guardian',
          topic: "news"
        }),
        Map({
          continent: "Europe",
          country: "UK",
          feed: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk',
          name: 'BBC',
          topic: "news"
        }),
        Map({
          continent: "Europe",
          country: "France",
          feed: 'http://www.france24.com/en/france/rss',
          name: 'France24',
          topic: "news"
        }),
        Map({
          continent: "North America",
          country: "US",
          feed: 'https://www.voanews.com/api/zq$omekvi_',
          name: 'VOA',
          topic: "news"

        }),
        Map({
          continent: "Asia",
          country: "Bhutan",
          feed: 'http://www.kuenselonline.com/feed/',
          name: 'Kuensel',
          topic: "news"
        }),

        Map({
          continent: "Asia",
          country: "Japan",
          feed: 'http://feeds.thejapannews.net/rss/c4f2dd8ca8c78044',
          name: 'The Japan News',
          topic: "news"
        }),
        Map({
          continent: "Australasia",
          country: "Australia",
          feed: 'http://www.abc.net.au/radio/programs/the-signal/feed/9443166/podcast.xmls',
          name: 'ABC',
          topic: "news"
        }),
        Map({
          continent: "Europe",
          country: "Germany",
          feed: 'http://www.spiegel.de/international/index.rss',
          name: 'Der Spiegel',
          topic: "news"
        }),
        Map({
          continent: "North America",
          country: "US",
          feed: 'https://www.newyorker.com/feed/humor',
          name: 'The New Yorker',
          topic: "humour"
        }),
        Map({
          continent: "North America",
          country: "US",
          feed: 'https://www.firstthings.com/rss/web-exclusives',
          name: 'First Things',
          topic: "religion"
        }),
        Map({
          continent: "Europe",
          country: "Sport",
          feed: 'http://www.skysports.com/rss/12040',
          name: 'Sky Sports',
          topic: "sport"
        })
      ])
    })


    const romanian = Map({
      name: "Romanian",
      publications: List([
        Map({
          continent: "Europe",
          country: "Romania",
          feed: 'https://www.digi24.ro/rss',
          name: 'Digi24'
        })

      ])
    })
    const allPublications = List([english, romanian])
    const availableLanguages = this.getNames(allPublications);
    const firstLangaugePublications = allPublications.get(0).get('publications')
    const publicationNamesInFirstLangauge = this.getNames(firstLangaugePublications)

    this.state = {
      allPublications: allPublications,
      availableLanguages: availableLanguages,
      selectedLanguage: availableLanguages.get(0),
      availablePublications: publicationNamesInFirstLangauge,
      selectedPublication: publicationNamesInFirstLangauge.get(0),
      feed: firstLangaugePublications.get(0).get('feed'),
      publicationName: firstLangaugePublications.get(0).get('name'),
      articles: []
    };
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handlePublicationChange = this.handlePublicationChange.bind(this);
  }

  getNames = (object) => {
    return object.map(element => {
      return element.get("name")
    })
  }

  getAllThePublicationsInLanguage = (language) => {
    return this.state.allPublications
      .find(allPublicationsByLangauge => {
        return allPublicationsByLangauge.get("name") === language
      }).get("publications")
  }

  getPublication(publicationName, language) {
    const publications = this.getAllThePublicationsInLanguage(language);
    return publications
      .find(p => {
        return p.get("name") === publicationName
      })
  }

  handlePublicationChange(event) {
    const selectedPublication = event.target.value
    const publication = this.getPublication(selectedPublication, this.state.selectedLanguage);

    this.setState({
      selectedPublication: selectedPublication,
      feed: publication.get("feed"),
      publicationName: publication.get("name")
    })
  }


  handleLanguageChange(event) {
    const clickedOnLanguage = event.target.value
    const publicationsForLanguage = this.getAllThePublicationsInLanguage(clickedOnLanguage);
    const publicationNames = this.getNames(publicationsForLanguage);
    const publication = this.getPublication(publicationNames.first(), clickedOnLanguage)

    this.setState({
      selectedLanguage: clickedOnLanguage,
      availablePublications: publicationNames,
      selectedPublication: publicationNames.first(),
      feed: publication.get("feed"),
      publicationName: publication.get("name")

    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">News</h1>
          <Form inline>
            <Form.Group controlId="language-select" value={this.state.selectedLanguage} onChange={this.handleLanguageChange}>
              <Form.Label>Language select</Form.Label>
              <Form.Control as="select">
              {this.state.availableLanguages.map(language => {
                return <option key={language} value={language}>{language}</option>
              })}
              </Form.Control>
            </Form.Group>
            
            <Form.Group controlId="publication-select" value={this.state.selectedPublication} onChange={this.handlePublicationChange}>
              <Form.Label>Publication select</Form.Label>
              <Form.Control as="select">
              {this.state.availablePublications.map(publication => {
                  return <option key={publication} value={publication}>{publication}</option>
                })}
              </Form.Control>
            </Form.Group>
          </Form>

        </header>

        <AllNewsItems name={this.state.selectedPublication} feed={this.state.feed} publicationName={this.state.publicationName} />

      </div >
    );
  }
}

export default App;