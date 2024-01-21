import { Card, CardBody, CardProps, Heading } from "@chakra-ui/react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Customized  } from 'recharts';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label as LabelOp, Operation, OperationDates } from "../../interfaces/Operation";
// import { useEffect, useState } from "react";
// import LabelTag from "../atoms/LabelTag";
// import { useTheme } from "@chakra-ui/react";

interface BalanceTrendCardProps extends CardProps {
  operations?: Operation[],
  labels?: LabelOp[],
  operationIdToDateMap?: OperationDates[],
}

export const BalanceTrendCard = ({operations, labels, operationIdToDateMap, ...props} : BalanceTrendCardProps) => {
  const {t} = useTranslation('ns1',{ i18n } );

  return (
    <Card {...props}>
      <CardBody>
        <Heading size={'md'} m={1}>{t('balance trend')}</Heading>      
        
        {operations?.length}-
        {labels?.length}-
        {operationIdToDateMap?.length}
        
      </CardBody>
    </Card>
  );
}

export default BalanceTrendCard;