import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Flex,
  Spacer,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  useEffect(() => {
    if (!isLoading) { // Check if Auth0 has finished loading
      console.log(JSON.stringify(user));
      console.log(isAuthenticated);
    }
  }, [isLoading, isAuthenticated, user]);

  return (
    <Flex bg="teal" p={4}>
      <Box>
        <Heading as="h1" size="lg" color="white">
          Book Dashboard
        </Heading>
      </Box>
      <Spacer />
      <Box>
        {isLoading ? ( // Show loading state
          <div>Loading...</div>
        ) : isAuthenticated ? (
          <>
            <ChakraLink as={Link} to="/" mr={4}>
              Books
            </ChakraLink>
            <ChakraLink as={Link} to="/create" mr={4}>
              Create Book
            </ChakraLink>
            <ChakraLink onClick={() => logout()} mr={4}>
              Log Out
            </ChakraLink>
          </>
        ) : (
          <>
            <ChakraLink onClick={handleLogin} mr={4}>
              Log In
            </ChakraLink>
            <ChakraLink onClick={handleLogin}>Sign Up</ChakraLink>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navigation;
