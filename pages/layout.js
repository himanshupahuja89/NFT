import React from 'react'
import { Logo, Button, Card, Footer, Filter, CheckBox } from '../Components'

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
    </div>
  )
}

export default layout