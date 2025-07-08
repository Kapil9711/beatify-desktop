import { Button } from '@heroui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <h1>home page</h1>
      <Button onPress={() => navigate('/settings')}>Settings</Button>
    </>
  )
}

export default Home
