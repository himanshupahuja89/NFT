import React from 'react'
import { Logo, Button, Card, Footer, Filter, CheckBox, Donate } from '../Components'

const layout = () => {
  return (
    <div className='home'><Logo />
      <Button />
      <Card />
      <p> Footer </p>
      <Footer/>
      <p> CheckBox </p>
      <CheckBox/>
      <Filter />
      <Donate/>
    </div>
  )
}

export default layout