import '../index.css'
import { useNavigate  } from "react-router-dom";
import { useState } from 'react'
import {Flex, Heading, Input, Center, Stack, Button, Text} from "@chakra-ui/react"


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [correctCreds, setCorrrectcreds] = useState(true)
  const navigate = useNavigate();
  
  const submitHandler = async (e) => {

    let clientID = btoa(username + ':' + password);
    
    
    e.preventDefault();
    await fetch("http://127.0.0.1:5000/authenticate", {
      method: "POST",
      headers: {
        'Origin': 'http://localhost:3000',
        'Authorization': `Basic ${clientID}`
      },
      credentials:"include"
    }).then(response =>{
      if(response.ok){
        setCorrrectcreds(true);
        navigate('/Dashboard')
    }
    else{
      if(response.status === 401){
        setCorrrectcreds(false);
      }
    }}).catch(
      error=>{alert(error)
    
    })

  }

  return (
    <Stack bgGradient='linear(to-tl, black, blue.800)' dir='column' height="100vh" alignItems="center" justify="center">
        <Flex height= "50vh" width="50vh" alignItems="center" direction="column" bgGradient='linear(to-br, blue.200, pink.200)' p={12} rounded={3} >
          <Heading mb={2}>Log In</Heading>
          <Center direction="column" width="50vh" height="70vh">
          <form onSubmit={submitHandler}>
            <Stack spacing={4}>
              {
                correctCreds ? 
                <Center>
                  <Text></Text>
                </Center>
                :
                <Center>
                  <Text color='red'>Incorrect Username/Password</Text>
                </Center>
              }
                <Input rounded={3} value={username} onChange={(e)=> setUsername(e.target.value)} width="30vh" height="5vh" placeholder='Username' variant="filled" p = {3}></Input>
                <Input rounded={3} type="password" borderColor="gray" value={password} onChange={(e)=> setPassword(e.target.value)} width="30vh" height="5vh" placeholder="***********" variant="filled" p = {3}></Input>
                <Button rounded={3} bgGradient='linear(to-tr, blue.500, pink.800)' type="submit" colorScheme='pink'>Log In</Button>
            </Stack>
          </form>
          </Center>
        </Flex>
    </Stack>

  );
}

export default Login;
