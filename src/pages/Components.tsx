import { Heading, VStack, } from "@chakra-ui/react";
import CountryTable from "../components/molecules/CountryTable";

export default function Homepage() {
  

  return (
    <VStack>
      <Heading>Demo Page</Heading>
      <CountryTable/>
    </VStack>
  );
}