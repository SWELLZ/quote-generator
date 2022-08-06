import React from "react";
import './Quote.css';

export default class Quote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quote: '',
            author: '',
            tweet: '',
            tumblr: ''
        }
        this.updateQuote = this.updateQuote.bind(this)
    }
    async updateQuote(){
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        if (response.ok){
            this.setState({
                quote: data.content,
                tweet: `https://twitter.com/intent/tweet?text="${data.content}" -${data.author}`,
                tumblr: `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${data.author}&content=${data.content}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`,
                author: data.author
            })
        } else {
            console.log(`An error has occured: ${data}`);
        }
    }
    componentDidMount(){
        this.updateQuote();
    }
    render(){
        return (
            <>
                <div id="quote-container">
                    <div className="quote">
                        <p id="displayed-quote"><i className="fa-solid fa-quote-left"></i> {this.state.quote}</p>
                    </div>
                    <div className="quote-author">
                        <p id="displayed-author">- {this.state.author}</p>
                    </div>
                    <div id="action-buttons">
                        <div className="post-buttons">
                            <a href={this.state.tweet} target="_blank"><i className="fa-brands fa-square-twitter"></i></a>
                            <a href={this.state.tumblr} target="_blank"><i className="fa-brands fa-square-tumblr"></i></a>
                        </div>
                        <div className="new-quote-btn">
                            <button id="gen-quote" onClick={this.updateQuote}>New Quote</button>
                        </div>
                    </div>
                </div>
                <div id="my-name">
                    <p>By Nehemiah Dias</p>
                </div>
            </>
        )
    }
}