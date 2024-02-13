import { Card, CardBody, Heading, VStack, Text, Flex, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";

export interface BarCharTooltipProps {
    active?: boolean;
    payload?: { name: string; value: number }[];
    label?: string;
}

export const BarCharTooltip: React.FC<BarCharTooltipProps> = ({ active, payload, label }) => {
    const { colorMode } = useColorMode();
    const {t} = useTranslation('ns1',{ i18n } );
    const bg = colorMode === 'light' ? 'secondary.500' : 'secondary.400'; // Semplificazione della selezione del colore di sfondo

    if (active && payload && payload.length > 0 && label) {
        return (
            <Card bg={bg} color={'white'}>
                <CardBody>
                    <Heading size={'sm'}>{label}</Heading>
                    <VStack align={'normal'}>
                        {payload.map((item, index) => (
                            <Flex key={index}>
                                {t(item.name)}:<Text color={index % 2 === 0 ? "green.300" : "red.300"}> {item.value.toLocaleString()} €</Text>
                            </Flex>
                        ))}
                    </VStack>
                </CardBody>
            </Card>
        );
    }

    return null;
};

export default BarCharTooltip;
