import React from "react";

import { QuotesRESTAPIUrl } from "../consts";

class QuoteOfTheDay extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      quote: { quote: "Loading...", author: null }
    };
  }

  componentWillMount() {
    this.getQuote().then(quote => this.setState({ quote }));
  }

  getQuote = async () => {
    try {
      const res = await fetch(QuotesRESTAPIUrl);
      const data = await res.json();
      const { quote, author } = data["contents"]["quotes"][0];
      return { quote, author };
    } catch (e) {
      return {
        quote: `GET ${QuotesRESTAPIUrl} 429 (Too Many Requests)`,
        author: "quotes.rest"
      };
    }
  };

  render() {
    const { quote, author } = this.state.quote;

    return (
      <div id="quoteOfTheDay">
        <p>{quote}</p>
        {author !== null ? <p className="author">—{author}</p> : null}
      </div>
    );
  }
}

export default QuoteOfTheDay;
