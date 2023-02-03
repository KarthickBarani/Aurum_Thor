
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Root } from './router/Root';





function App() {

  useEffect(() => {
    localStorage.clear()
    return () => localStorage.clear()
  })


  return (
    <>
      <Root />
      <Toaster />
    </>
  )
}

export default App;

