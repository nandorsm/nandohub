import { useState } from 'react'
import MainRouters from './routers'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainRouters/>
    </>
  )
}

export default App
