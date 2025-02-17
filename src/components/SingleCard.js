import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    // if disable is true it does nothing if it false then it will call handle choice function
    if(!disabled){
      handleChoice(card)
    }
  }
    return ( 
        <div className="card">
          {/* if flipped is true then class flipped is applied (css) and if fliiped id false it remains an empty string menaing the card remains face down */}
          <div className={flipped ? "flipped" : ""}>
            <div>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" src="/img/cover.png" onClick={handleClick} alt="card back" />
            </div>
          </div>
        </div>
     )
}