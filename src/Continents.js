import React, { Component } from 'react';
import './App.css';
import { Map, List } from 'immutable';
import { Link } from 'react-router-dom';



class Continents extends Component {

    handleClick = (e) => {

    }

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        // this.handleClick = this.handleClick.bind(this)
        const europe = Map({
            name: "Europe",
            countries: List([
                Map({
                    name: "UK",
                    feed: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk'
                }),
                Map({
                    name: "Romania",
                    feed: 'http://www.romania-insider.com/feed/atom/'

                }),
                Map({
                    name: "Germany",
                    feed: 'http://www.spiegel.de/international/index.rss'

                }),

                

                Map({
                    name: "Romania",
                    feed: 'https://www.digi24.ro/rss',
                })
            ])
        })
        const asia = Map({
            name: "Asia",
            countries: List([
                Map({
                    name: "China",
                    feed: 'http://feeds.bbci.co.uk/zhongwen/simp/rss.xml'
                }),
                Map({
                    name: "Bhutan",
                    feed: 'http://www.kuenselonline.com/feed/',
                })
            ])
        })

        

        this.state = {
            continents: List([europe, asia])
        };
    }

    render() {
        return (





            <div>

                {this.state.continents.map(element => {
                    return <ul key={element}>
                        <li id="continent" key={element.get("feed")} onClick={this.handleClick}>{element.get("name")}
                            <ul>
                                {element.get("countries").map(country => {
                                    return <li key={country.get("feed")}><Link to={{ pathname: '/country', countryDetails: { country } }}>
                                        {country.get('name')}
                                    </Link></li>
                                })}

                            </ul>
                        </li>
                    </ul>
                })}

            </div>
        );
    }
}

export default Continents;
