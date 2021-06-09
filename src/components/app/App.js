import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // const [id, setId] = useState()
  // const [stopState, setStop] = useState();
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

  let ticketsArray = [];

  const loadTickets = (id) => {
    /**
     * Сейчас новую пачка билетов сетится каждый раз, когда ты ее получаешь
     * Потому что в коде
     * if (!stop) {
          return loadTickets(id);
        }
        не хватало return, то есть условия перехода к следующей итерации.
        Каждая функция доходила до return setTickets(ticketsArray); и сетила
        состояние, и если было, скажем, 10 запросов, то состояние сетилось 10 раз.
        
        Теперь состояние stopState не нужно
     */
    const dataUrl = `https://front-test.beta.aviasales.ru/tickets?searchId=${id}`;
    axios
      .get(dataUrl)
      .then((response) => {
        const { tickets, stop } = response.data;
        ticketsArray = [...ticketsArray, ...tickets];
        if (!stop) {
          return loadTickets(id); //не хватало return
        }

        if (stop) {
          // setStop(stop);
          // console.log(ticketsArray);
        }

        return setTickets(ticketsArray);
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
      <div className="tickets">
        {Boolean(ticketsData.length) && ticketsData.length}
      </div>
    </div>
  );
}

export default App;
