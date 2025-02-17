// use effect is used to handle side effect (start anew game, checking for matches)
// use state used to manage game state(choices , turn, cards)
import { useEffect,useState } from 'react'
import './App.css';
import SingleCard from './components/SingleCard'

// this is a aray of card object with image source and matched flag
const cardImages = [
  {"src": "img/helmet-1.png" , matched: false},
  {"src": "img/potion-1.png", matched: false },
  {"src": "img/ring-1.png", matched: false },
  {"src": "img/scroll-1.png" , matched: false},
  {"src": "img/shield-1.png" , matched: false},
  {"src": "img/sword-1.png" , matched: false}
]
function App() {
// when player clicks a card choice one is setwhen player click a second card choice two is set if both match matched become true and update in cards and if not match card will flip after 1 second
// turns will incremet after every two card selection
// disabled prevents extra click during the checking phase
// cards is an state variable that stores an array of cards
// setcards is a function to update cards
//  useState([])-it initializes cards as an empty array
  const [cards, setCards] = useState([])
  // turns initial value is 0
  // set turns update when every two card is selected
  // turns keep track of how many turns player has taken 
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards function
   // duplicate the cards ,Shuffle the cards in random order and Loop through each card, make a copy of the card object , and give it a random ID to each card .
    // then store the modifies array in shuffled cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      // Reset the Game State when a new game is start
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
  // handlechoice function takes card as a parameter
  // card represents the card the player just clicked
  // if choiceone is already filled then card is stored in choice two and if empty then it store the card in choice one
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare two selected cards
  // it work only when player select two cards
  // check choice one and choicetwo are selected or not if selected then set disabled will true 
  // then check both src are matched then cards state will update 
  // we will loop through each card which is pointed out by card in prevcards array and 
  // then if card and choice one source are matched then it will create a new object of card with all its properties and true value assign to matched 
  // if not then it will return card 
  // reset the selected card after the cards are marked as matched
  // if cards not match then wait for 1 second after that  it will call reset turn function 

  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return{...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
    // this are the dependency array which tell usereffect when to run 
  }, [choiceOne, choiceTwo]) 

  console.log(cards)

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(pevTurns => pevTurns + 1)
    setDisabled(false)
  }
// this useeffect run only once because the dependency array is empty
// this call shufflecards function 
  useEffect(() => {
    shuffleCards()
  }, [])
  
  return (
    <div className="App">
    {/* title of the game */}
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceOne || card === choiceTwo || card.matched } disabled={disabled}/>
        ))}
      </div>
      {/* display the no of turns */}
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
