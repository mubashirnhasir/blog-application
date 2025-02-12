import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'

function App() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  return (
    <>
      <div className=''>
            Mubahsir nisar
      </div>
    </>
  )
}

export default App
