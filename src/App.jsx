import { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import "./App.css";
import axios from "axios";
function App() {
  const [book, setBook] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [status, setStatus] = useState("loading...");
  async function search() {
    try {
      const searchItem = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputSearch}`
      );
      setBook(searchItem.data.items);
      console.log(searchItem.data.items);
    } catch (error) {
      setStatus(error);
    }
  }
  useEffect(() => {
    inputSearch === "" ? setBook([]) : search();
  }, [inputSearch]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <DebounceInput
        type="text"
        minLength={2}
        debounceTimeout={500}
        value={inputSearch}
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
      />
      {book.map((item, index) => {
        return <li key={index}> {item.volumeInfo.title}</li>;
      })}
    </div>
  );
}

export default App;
