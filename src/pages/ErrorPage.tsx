import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <Center w="100vw" h="100vh">
      <VStack spacing={6}>
        <Heading>Oops!</Heading>
        <Text>Sorry, an unexpected error has occurred.</Text>
        <Text>
          {isRouteErrorResponse(error)
            ? `${error.status} ${error.statusText}: ${error.data}`
            : (error as Error).message}
        </Text>
        <Button onClick={() => navigate(-1)}>Torna indietro</Button>
      </VStack>
    </Center>
  );
}
