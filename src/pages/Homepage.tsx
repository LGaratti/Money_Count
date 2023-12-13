import { Heading, VStack } from "@chakra-ui/react";

export default function Homepage() {
//   const [countries, setCountries] = useState<Country[]>([]);
// 
//   useEffect(() => {
//     getCountries();
//   }, []);
// 
//   async function getCountries() {
//     const { data } = await supabase.from("countries").select();
//     setCountries(data || []);
  // }

  return (
    <VStack>
      <Heading>Money Count</Heading>
    </VStack>
  );
}
