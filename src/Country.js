import React, { Component } from 'react';
import './App.css';
import Parser from 'rss-parser'
import { Map } from 'immutable'


class Country extends Component {

    constructor(props) {
        super(props);

        let country = props.name
        let feed = props.feed
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        let parser = new Parser()
        parser.parseURL(CORS_PROXY + feed, this.callback)
        this.state = {
            name: country,
            articles: []
        };
    }

    componentWillReceiveProps(nextProps) {
        const country = nextProps.name
        let feed=nextProps.feed
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        let parser = new Parser()
        parser.parseURL(CORS_PROXY + feed, this.callback)
        this.setState({
            name: country,
            articles: this.state.articles
        });
    }

    callback = (err, feed) => {
        let articles = []

        feed.items.forEach((entry) => {
            const encodedContent = entry['content:encoded']
            let title = Map({
                id: entry.id,
                title: entry.title,
                link: entry.link,
                encodedContent: encodedContent,
                contentSnippet: entry.contentSnippet,
                pubDate: entry.pubDate,
                guid: entry.guid,
                isoDate: entry.isoDate,
                author: entry.author
            })
            articles.push(title)
        })
        this.setState({ "articles": articles })
    }

    render() {
        return (
            <div>

                <h1>{this.props.name}</h1>

                {this.state.articles.map(element => {
                    const link = element.get('link')
                    const title = element.get('title')
                    const contentSnippet = element.get('contentSnippet')
                    const pubDate = element.get('pubDate')
                    if (contentSnippet)
                        return <div key={link}>
                            <a href={link}>{title}</a><br />
                            {contentSnippet}<br />
                            {pubDate}<br />
                            <br />
                        </div>
                    else
                        return <div key={link}>
                            <a href={link}>{title}</a><br />
                            {pubDate}<br />
                            <br />
                        </div>
                })}
            </div>
        );
    }
}

export default Country;
