import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  // const [id, setId] = useState()
  const [stopState, setStop] = useState()
  const [ticketsData, setTickets] = useState([])

  const getSearchId = async () => {
    const idUrl = 'https://front-test.beta.aviasales.ru/search'
    const {
      data: { searchId },
    } = await axios.get(idUrl)

    return searchId
  }

  let ticketsArray = []

  const loadTickets = async (id) => {
    const dataUrl = `https://front-test.beta.aviasales.ru/tickets?searchId=${id}`
    await axios
      .get(dataUrl)
      .then((response) => {
        const { tickets, stop } = response.data
        ticketsArray = [...ticketsArray, ...tickets]
        if (!stop) {
          loadTickets(id)
        }

        if (stop) {
          setStop(stop)
          console.log(ticketsArray)
        }

        return setTickets(ticketsArray)
      })
      .catch(() => {
        loadTickets(id)
      })
  }

  const getTicketsArray = async () => {
    const id = await getSearchId()

    return await loadTickets(id)
  }

  useEffect(() => {
    return getTicketsArray()
  }, [])

  return (
    <div className='App'>
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
      {stopState && <div className='tickets'>{ticketsData.length}</div>}
    </div>
  )
}

export default App
