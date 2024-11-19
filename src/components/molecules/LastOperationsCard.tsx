import { Card, CardBody, Heading, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Wrap, Box, useColorMode, VStack, Stack, StackProps } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";
import { Label, Operation, OperationsForDate} from "../../interfaces/Operation";
import LabelTag from "../atoms/LabelTag";
import { useEffect, useState } from "react";
import { enUS, it } from "date-fns/locale";
import { format } from "date-fns";

interface DateOps {
  date: Date;
  op: Operation;
}

interface LastOperationsCardProps extends StackProps {
  operations?: Operation[];
  opsToDate: OperationsForDate[];
}

export const LastOperationsCard = ({ operations, opsToDate, ...props }: LastOperationsCardProps) => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation("ns1", { i18n });
  const currentLocale = i18n.language === "it" ? it : enUS;
  const [gains, setGains] = useState<DateOps[]>();
  const [losses, setLosses] = useState<DateOps[]>();
  useEffect(() => {
    if (!operations || !opsToDate) return;
    const tempGains: DateOps[] = [];
    const tempLosses: DateOps[] = [];
    opsToDate.forEach((opToDate) => {
      opToDate.operations_id.forEach((opId) => {
        const operation = operations.find((op2) => op2.operation_id === opId) || undefined;
        if (operation) {
          if (operation.amount > 0)
            tempGains.push({ date: opToDate.date, op: operation });
          else tempLosses.push({ date: opToDate.date, op: operation });
        }
      });
    });

    tempGains.sort((a, b) => b.date.getTime() - a.date.getTime());
    tempLosses.sort((a, b) => b.date.getTime() - a.date.getTime());
    setGains(tempGains.slice(0, 4));
    setLosses(tempLosses.slice(0, 4));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opsToDate]);

  const labelsWithoutGainAndLoss = (labels: Label[]) => {
    const filteredLabels = labels.filter((label) => label.name != "gain" && label.name != "loss");
    return filteredLabels;
  };

  const atLeastOneLabel = (tableOps: DateOps[]) => {
    let atLeastOne = false;
    tableOps?.map((operation) => {
      const labels = labelsWithoutGainAndLoss(operation.op.labels);
      if (labels.length > 0) atLeastOne = true;
    });
    return atLeastOne;
  };

  const formatDate = (date: Date) => {
    return format(date, "d/M/yy", { locale: currentLocale }); // Utilizza il formato di data desiderato
  };

  const OperationsTable = ({ ops, title, color }: {
    ops?: DateOps[];
    title: string;
    color: string;
  }) => (
    <Box>
      <Heading size={"sm"} textAlign="center" m={2} color={(colorMode === "light" && color + ".500") || color + ".600"}>
        {t(title)}
      </Heading>
      {ops && (
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>{t("date")}</Th>
                <Th>{t("name")}</Th>
                <Th>{t("amount")}</Th>
                {atLeastOneLabel(ops) && <Th>{t("labels")}</Th>}
              </Tr>
            </Thead>
            <Tbody>
              {ops.map((dateOp) => (
                <Tr key={dateOp.op.operation_id}>
                  <Td>{dateOp.date && formatDate(dateOp.date)}</Td>
                  <Td>{dateOp.op.name}</Td>
                  <Td>{dateOp.op.amount + " €"}</Td>
                  {atLeastOneLabel(ops) && (
                    <Td>
                      <Wrap spacing={2}>
                        {labelsWithoutGainAndLoss(dateOp.op.labels).map(
                          (label) => (
                            <LabelTag key={label.label_id} label={label} />
                          )
                        )}
                      </Wrap>
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );

  return (
    <Card {...props} minH={'331.19px'}>
    <CardBody>
    <VStack {...props}>
      <Heading size={"md"} m={1}>
        {t("latest operations")}
      </Heading>
      <Stack direction={{ base: "column", md: "row" }}>
        <OperationsTable ops={gains} title={t("gain")} color="green" />
        <OperationsTable ops={losses} title={t("loss")} color="red" />
      </Stack>
    </VStack>
    </CardBody>
    </Card>
  );
};

export default LastOperationsCard;