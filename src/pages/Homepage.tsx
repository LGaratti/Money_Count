import { Heading, ListItem, UnorderedList, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

interface Country {
  id: number;
  name: string;
  population: number;
}

export default function Homepage() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data || []);
  }

  return (
    <VStack>
      <Heading>Money Count</Heading>
      <UnorderedList>
        {countries.map((country) => (
          <ListItem
            key={country.id}
          >{`${country.name} - ${country.population}`}</ListItem>
        ))}
      </UnorderedList>
    </VStack>
  );
}
