import './searchBar.scss'

function SearchBar(){
  return (
    <div className='searchBar'>
    <div className="type">
</div>
    <form>
      <input type = "text" name = "location" placeholder='City Location' />
      <button>
        <img src="/search.png" alt="" />
      </button>
    </form>
    </div>
  )
}

export default SearchBar 