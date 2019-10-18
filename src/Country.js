import React, { Component } from 'react';
import './App.css';
import Parser from 'rss-parser'
import { Map } from 'immutable'
import StoryModal from './StoryModal'



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
        this.handleShow = this.handleShow.bind(this);
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
            show:false,
            publisher: publisher
        });
    }

    callback = (err, feed) => {
        console.log()
        let articles = []

         

        feed.items.forEach((entry) => {
            let shortenedContentSnippet = entry.contentSnippet.substring(0,200) + "..." //TODO format properly

            const encodedContent = entry['content:encoded']
            let title = Map({
                id: entry.id,
                title: entry.title,
                link: entry.link,
                encodedContent: encodedContent,
                contentSnippet: shortenedContentSnippet,
                pubDate: entry.pubDate,
                guid: entry.guid,
                isoDate: entry.isoDate,
                author: entry.author
            })
            articles.push(title)
        })
        this.setState({ "articles": articles })
    }


    handleShow(link) {

        this.setState({ show: true,
        link:link });
    }

    render() {
        return (

            <div>

                <StoryModal name ={this.state.name }link={this.state.link} show={this.state.show} />
                <h1>{this.props.name}</h1>

                {this.state.articles.map(element => {
                    const link = element.get('link')
                    
                    const title = element.get('title')
                    const contentSnippet = element.get('contentSnippet')
                    const pubDate = element.get('pubDate')
                    const guid = element.get('guid')

                    if (contentSnippet)
                        return <div key={guid}>
                            <a onClick={()=>this.handleShow(link)}>{title}<br /></a>
                            <div>{contentSnippet}</div>
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
