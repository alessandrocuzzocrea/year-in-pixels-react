import React from 'react';

class QuoteOfTheDay extends React.Component {

    constructor() {
        super();

        this.state = {
            quote: {quote: "Loading...", author:null},
        };
    }

    componentWillMount()  {
        fetch("https://quotes.rest/qod")
            .then(res => {
            
                if (res.ok) {
                    return res.json().then(data => {
                        const quote = data['contents']['quotes'][0]; 
                        this.setState({quote});
                    });
                } else {
                    return res.json().then(() => {
                        const quote = {quote: "GET https://quotes.rest/qod 429 (Too Many Requests)", author:"quotes.rest"};
                        this.setState({quote});
                    });
                };
            });
    }

    render() {

        const { quote, author } = this.state.quote;

        return (
            <div id="quoteOfTheDay">
                <p>{quote}</p>{ (author !== null) ? <p className="author">—{author}</p> : null}
            </div>
        );
    }
}

export default QuoteOfTheDay;
