
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Root } from './router/Root';


function App() {

  useEffect(() => {
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
