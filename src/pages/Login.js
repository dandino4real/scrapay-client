
// Login.js
import React from "react";
import { Button, Container, Heading, Icon } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { MdLogin } from "react-icons/md";

const Login = (props) => {
  const {login} = props
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (

    !isAuthenticated &&  (
    <Container>
      <Heading as="h1" size="xl" mt={8} mb={4}>
        login
      </Heading>
      <Button
        onClick={() => loginWithRedirect()}
        rightIcon={<Icon as={MdLogin} />}
      >
        {login}
      </Button>
    </Container>
    )
  );
};

export default Login;
