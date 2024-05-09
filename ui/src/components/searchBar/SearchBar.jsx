import './searchBar.scss'

function SearchBar(){

  // const [query, setQuery] = useState({
  //   city: "",
  // });
  

  return (
    <div className='searchBar'>
    <div className="type">
</div>
    <form>
      <input type = "text" name = "city" placeholder='City Location' />
      <button >
        <img src="/search.png" alt="" />
      </button>
    </form>
    </div>
  )
}

export default SearchBar 