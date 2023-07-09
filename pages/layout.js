import React from 'react'
import { Logo, Button, Card, Footer, CheckBox } from '../Components'

const layout = () => {
  return (
    <div className='home'><Logo />
      <Button />
      <Card />
      <p> Footer </p>
      <Footer/>
      <p> CheckBox </p>
      <CheckBox/>
    </div>
  )
}

export default layout