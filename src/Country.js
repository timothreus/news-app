import React, { Component } from 'react';
import './App.css';
import Parser from 'rss-parser'
import { Map } from 'immutable'



class Country extends Component {

    constructor(props, context) {
        super(props, context);


        let country = props.name
        let feed = props.feed
        let publisher = props.publisher
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        let parser = new Parser()
        parser.parseURL(CORS_PROXY + feed, this.callback)
        this.state = {
            name: country,
            articles: [],
            publisher: publisher
        };
    }

    componentWillReceiveProps(nextProps) {
        const country = nextProps.name
        let feed = nextProps.feed
        let publisher = nextProps.publisher
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        let parser = new Parser()
        parser.parseURL(CORS_PROXY + feed, this.callback)
        this.setState({
            name: country,
            articles: this.state.articles,
            publisher: publisher
        });
    }

    callback = (err, feed) => {
        console.log()
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
                    const guid = element.get('guid')
                    const encodedContent = element.get('encodedContent')
                    if (contentSnippet)
                        return <div key={guid}>
                            <a href={link}  target="_blank">{title}</a>
                            {/* A few like der speigel have encoded content that could be shown instead of the content snippet */}
                            {/* <div dangerouslySetInnerHTML={{ __html: element.get('encodedContent') }} /> */}
                            {encodedContent !== undefined && encodedContent.length > 0 ? <div dangerouslySetInnerHTML={{ __html: element.get('encodedContent') }} /> : <div>{contentSnippet}</div>}
                            <div><strong>{this.state.publisher}</strong></div>
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
