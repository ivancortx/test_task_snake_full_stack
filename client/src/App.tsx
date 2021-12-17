import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { HomePage } from './ui/home'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <HomePage/>
    </BrowserRouter>
  )
}

export default App
