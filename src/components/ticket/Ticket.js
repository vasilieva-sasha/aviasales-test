const Ticket = (data) => {
  const { carrier, price, segments } = data
  return (
    <div className='ticket'>
      <div className='ticket__wrapper'>
        <div className='ticket__price'>{price}</div>
        <div className='ticket__carrier'>{carrier}</div>
      </div>
      <div className='ticket__wrapper'>
        <div className='ticket__segment'>
          <div className='ticket__from'>{segments[0].origin}</div>
        </div>
      </div>
    </div>
  )
}
