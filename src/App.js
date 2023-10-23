import './App.css';
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

function App() {

    const [color, setColor] = useState('#000000');
    const [quote, setQuote] = useState({text: 'Loading...', author: 'Spegy'})

    useEffect(() => {
        newQuote();
    }, [])

    function newQuote() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const options = {
            method: 'GET',
            headers: {'X-Api-Key': 'Hzw9wiAG7dv910xEJQs4jQ==uEjuHLpd5AbPXyC4'},
            contentType: 'application/json'
        }
        fetch('https://api.api-ninjas.com/v1/quotes?category=best', options)
            .then(res => res.json())
            .then(data => {
                setQuote({text: data[0].quote, author: data[0].author});
                setColor('#' + randomColor);
            })
            .catch(error => setQuote({text: 'Quote not found.', author: 'Spegy'}))
    }

    return (
        <div className="container" style={{backgroundColor: color, color: color}}>
            <div id="quote-box">
                <h1 id="text">{quote.text}</h1>
                <div id="author">- {quote.author}</div>
                <div className="buttons">
                    <a style={{backgroundColor: color}} id="tweet-quote"
                       href={`https://twitter.com/intent/tweet?text="${quote.text}" ${quote.author}`} target="_blank">
                        <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <button style={{backgroundColor: color}} id="new-quote" onClick={newQuote}>New quote</button>
                </div>
            </div>
        </div>
    );
}

export default App;
