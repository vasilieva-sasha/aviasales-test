import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // const [id, setId] = useState()
  const [stopState, setStop] = useState();
  const [ticketsData, setTickets] = useState([]);

  const getSearchId = async () => {
    const idUrl = "https://front-test.beta.aviasales.ru/search";
    //async-await vs promises https://axios-http.com/docs/example
    try {
      const {
        data: { searchId },
      } = await axios.get(idUrl);
      return searchId;
    } catch (err) {
      console.log(err);
    }
  };

  // let ticketsArray = [];

  const loadTickets = (id) => {
    /**
     * Если не хочется использовать внешнюю переменную ticketsArray -
     * можно сетить билеты в стейт каждый раз, как их получаешь.
     * В этом случае, однако, придется хранить и stopState - иначе непонятно, когда
     * закончили получать билеты. Т.е. мину одна внешняя переменная, плюс одно
     * состояние
     */
    const dataUrl = `https://front-test.beta.aviasales.ru/tickets?searchId=${id}`;
    axios
      .get(dataUrl)
      .then((response) => {
        const { tickets, stop } = response.data;
        // ticketsArray = [...ticketsArray, ...tickets];
        setTickets((prevState) => [...prevState, ...tickets]); //получили - сетим на основе предыдущего состояния
        if (!stop) {
          return loadTickets(id);
        }

        if (stop) {
          setStop(stop);
          // console.log(ticketsArray);
        }

        return setTickets((prevState) => [...prevState, ...tickets]);
      })
      .catch(() => {
        loadTickets(id);
      });
  };

  const getTicketsArray = async () => {
    const id = await getSearchId();

    await loadTickets(id);
  };

  useEffect(() => getTicketsArray(), []);

  return (
    <div className="App">
      {/* <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header> */}
      {/* <div className='search-id'>{id}</div> */}
      {/*Boolean(ticketsData.length) && ticketsData.length - чтобы в начале 
      не отображался 0 - то есть начальная длинная массива

      Можно сделать лоадер, например, на время получения билетов, типа
      Boolean(ticketsData.length) ? ticketsData.length : 'Loading...'
      */}
      <div className="tickets">{stopState && ticketsData.length}</div>
    </div>
  );
}

export default App;
