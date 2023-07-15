import React from 'react'
import { Logo, Button, Card, Footer, Filter, CheckBox, Donate, Form, Notification, Profile } from '../Components'

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
      <p>Form Component</p>
      <Form/>
      <p>Notification</p>
      <Notification/>
      <Profile />
    </div>
  )
}

export default layout