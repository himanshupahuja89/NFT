import React from 'react'
import { Logo, Button, Card, Footer, Filter, CheckBox, Donate, Form, Notification, Profile, Login, Header, SignUp } from '../Components'

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
      <Login/>
      <Header/>
      <SignUp/>
    </div>
  )
}

export default layout