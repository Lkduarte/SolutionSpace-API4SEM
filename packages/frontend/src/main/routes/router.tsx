import { MakeLogin, MakeTicketForm } from '@/main/factories/pages'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/ticket-form' element={<MakeTicketForm />} />
        <Route path='/login' element={<MakeLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
