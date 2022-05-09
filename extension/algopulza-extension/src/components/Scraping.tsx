import '../styles/Scraping.css'

export default function Scraping() {
  return (
    <div className="content content-big scraping-structure">
      <div className="justify-column">
        <div className='item item-top-margin'></div>
        <div className='item'></div>
        <div className='item'></div>
        <div className='item item-no-margin'></div>
      </div>

      <div className="justify-column">
        <div className='item item-top-margin'></div>
        <div className='item'></div>
        <div className='item'></div>
      </div>

      <div className='justify-edge'>
        <button id="btn-scraping" className='button-main button-black button-margin'>수집</button>
        <button id="btn-submitting" className='button-main button-margin'>제출</button> 
      </div>
    </div>
  )
}
