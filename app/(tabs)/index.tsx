import { Text, View } from "react-native";
import { Button, Card } from "@rneui/themed";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FormatCurrency } from "../../lib/FormatCurrency";
import { GetMonthlyIncome } from "../../lib/AccessStorage";

export default function Home() {
  const [monthlyIncome, setmonthlyIncome] = useState<string>("0");
  useFocusEffect(
    useCallback(() => {
      const GetIncome = async () => {
        const income = await GetMonthlyIncome();

        if (income !== undefined && income !== 0) {
          const formattedIncome = await FormatCurrency(income);
          setmonthlyIncome(formattedIncome);
        } else {
          console.error("Income is either undefined or 0");
        }
      };

      GetIncome();
    }, [])
  );

  return (
    <View>
      <Card>
        <Card.Title>Your Monthly Income</Card.Title>
        <Card.Divider />
        <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 7 }}>{monthlyIncome}</Text>
        <Button
          size="sm"
          type="solid"
          onPress={() => {
            router.push("modal/EditIncomeModal");
          }}
        >
          Edit
        </Button>
      </Card>
    </View>
  );
}
