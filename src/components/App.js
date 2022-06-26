//import
import './style/App.scss';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import mdcArray from './materialDesignColorArray';

function App() {
  //get quotes from provided URL
  const [quotes, setQuotes] = useState('');
  //get random color from provided Array
  const [randomColor, setRandomColor] = useState('');
  //get animation
  const [animation, setAnimation] = useState('');

  //Fetch the provided URL, set random quote, set random color
  const getRandomQuoteFromProvidedUrl = () => {
    fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
    .then((response) => response.json())
    .then((data) => { 
      //get random Integer and then set quote
      let randomInteger = Math.floor(Math.random() * data.quotes.length);
      setQuotes(data.quotes[randomInteger]);
      //get and set random color
      let randomColor = mdcArray[Math.floor(Math.random() * mdcArray.length)];
      setRandomColor(randomColor);
      //set animation
      setAnimation('true');
     });
   }
   
   useEffect(() => {
     getRandomQuoteFromProvidedUrl();
   }, [])

  return (
    <div className="App" style={{ backgroundColor: randomColor }}>
      <div id="quote-box" style={{ color: randomColor }}>
        <div className='animated'  onAnimationEnd={() => setAnimation('')}animation={animation}>
          <p id="text"><FontAwesomeIcon className='textQuote' icon={faQuoteLeft}></FontAwesomeIcon> {quotes.quote}</p>
          <p id="author">- {quotes.author}</p>
          <a id="tweet-quote" href={encodeURI(`https://twitter.com/intent/tweet?hashtags=quotes&text=${quotes.quote} -${quotes.author}`)} target="_blank" rel="noopener noreferrer" title="Tweet this quote" style={{ backgroundColor: randomColor }}><FontAwesomeIcon className='twitterLogo' icon={faTwitter}></FontAwesomeIcon></a>
          <button id="new-quote" onClick={getRandomQuoteFromProvidedUrl} style={{ backgroundColor: randomColor }}>NEW QUOTE</button>
        </div>
      </div>
    </div>
  );
}

export default App;
