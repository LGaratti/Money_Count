import { Card, CardBody, Heading, VStack, Text, Flex, useColorMode } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";

export enum CharTooltipMode {
    AREA = "area",
    BAR = "bar",
    PIE = "pie"
}

export interface CharTooltipProps {
    active?: boolean;
    payload?: { name: string; value: number }[];
    label?: string;
    mode: CharTooltipMode
}


export const CharTooltip: React.FC<CharTooltipProps> = ({ active, payload, label, mode }) => {
    const { colorMode } = useColorMode();
    const {t} = useTranslation('ns1',{ i18n } );
    const bg = colorMode === 'light' ? 'secondary.500' : 'secondary.400'; // Semplificazione della selezione del colore di sfondo

    const tooltipContent = (name:string,value:number,index:number,mode:CharTooltipMode) => {
        
        switch (mode) {
            case CharTooltipMode.AREA:
                return (
                    <Flex key={index}>
                        {t(name)}:<Text color={value >= 2 ? "green.300" : "red.300"}> {value.toLocaleString()} €</Text>
                    </Flex>
                );
            case CharTooltipMode.BAR:
                return (
                    <Flex key={index}>
                        {t(name)}:<Text color={index % 2 === 0 ? "green.300" : "red.300"}> {value.toLocaleString()} €</Text>
                    </Flex>
                );
            case CharTooltipMode.PIE:
                return (
                    <Flex key={index}>
                        {t(name)}:<Text color={index % 2 === 0 ? "green.300" : "red.300"}> {value.toLocaleString()} €</Text>
                    </Flex>
                );
        
            default:
                break;
        }

    }
    console.log(active, payload, label, mode);
    if (active && payload && payload.length > 0 && label) {
        return (
            <Card bg={bg} color={'white'}>
                <CardBody>
                    <Heading size={'sm'}>{label}</Heading>
                    <VStack align={'normal'}>
                        {payload.map((item, index) => (
                            tooltipContent(item.name,item.value,index,mode)
                        ))}
                    </VStack>
                </CardBody>
            </Card>
        );
    }

    return null;
};

export default CharTooltip;
