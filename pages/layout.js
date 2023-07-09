import React from 'react'
import { Logo, Button, Card, Footer } from '../Components'

const layout = () => {
  return (
    <div className='home'><Logo />
      <Button />
      <Card />
      <p> Footer </p>
      <Footer/>
    </div>
  )
}

export default layout