import React, { Component } from 'react';
import './App.css';
import Parser from 'rss-parser'
import { Map } from 'immutable'



class AllNewsItems extends Component {

    constructor(props, context) {
        super(props, context);


        let country = props.name
        let feed = props.feed
        let publicationName = props.publicationName
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        let parser = new Parser()
        parser.parseURL(CORS_PROXY + feed, this.callback)
        this.state = {
            name: country,
            articles: [],
            publicationName: publicationName
        };
    }

    componentWillReceiveProps(nextProps) {
        const country = nextProps.name
        let feed = nextProps.feed
        let publicationName = nextProps.publicationName
        const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
        let parser = new Parser()
        parser.parseURL(CORS_PROXY + feed, this.callback)
        this.setState({
            name: country,
            articles: this.state.articles,
            publicationName: publicationName
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

                {this.state.articles.map(newsItem => {
                    const link = newsItem.get('link')
                    
                    const title = newsItem.get('title')
                    const contentSnippet = newsItem.get('contentSnippet')
                    const pubDate = newsItem.get('pubDate')
                    const guid = newsItem.get('guid')
                    const encodedContent = newsItem.get('encodedContent')
                    if (contentSnippet)
                        return (
                            <div>
                                <div class="news-item" key={guid}>
                                    <a href={link}  target="_blank">{title}</a>
                                    {encodedContent !== undefined && encodedContent.length > 0 ? <div dangerouslySetInnerHTML={{ __html: newsItem.get('encodedContent') }} /> : <div>{contentSnippet}</div>}
                                    <div>
                                        <strong>{this.state.publicationName}</strong>
                                    </div>
                                    {pubDate}
                                </div>
                                <div className="blank-line-after">
                                    <br />
                                </div>
                            </div>  
                        )
                    else
                        return (
                            <div>
                                <div class="news-item" key={link}>
                                    <a href={link}>{title}</a><br />
                                    {pubDate}<br />
                                    <br />
                                </div>
                                <div className="blank-line-after">
                                    <br />
                                </div>
                            </div>
                        )

                })}

            </div>
        );
    }
}

export default AllNewsItems;
