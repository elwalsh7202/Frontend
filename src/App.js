import './App.css';
import './index.css'
import Login from './components/Login.js'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Login/>
    </ChakraProvider>

  );
}

export default App;
