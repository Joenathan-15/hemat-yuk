import { Text, View } from "react-native";
import { Button, Card, Slider } from "@rneui/themed";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FormatCurrency } from "../../lib/FormatCurrency";
import {
  GetMonthlyIncome,
  GetSpendingDivider,
  StoreSpendingDivider,
} from "../../lib/AccessStorage";

export default function Home() {
  const [dividerValue, setdividerValue] = useState<number>(0);
  const [formattedMonthlyIncome, setFormattedMonthlyIncome] =
    useState<string>("0");
  const [monthlyIncome, setmonthlyIncome] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const GetIncome = async () => {
        const income = await GetMonthlyIncome();
        const DividerPercentage = await GetSpendingDivider();
        const NumberdIncome = income ? +income : 0;
        const NumberDividerPercentage = DividerPercentage
          ? +DividerPercentage
          : 0;
        setdividerValue(NumberDividerPercentage);
        setmonthlyIncome(NumberdIncome);
        if (income !== undefined && income !== 0) {
          const formattedIncome = FormatCurrency(income);
          setFormattedMonthlyIncome(formattedIncome);
        }else{
          setFormattedMonthlyIncome("Rp 0")
        }
      };

      GetIncome();
    }, [])
  );

  return (
    <View style={{ marginVertical: 30 }}>
      <Card>
        <Card.Title>Your Monthly Income</Card.Title>
        <Card.Divider />
        <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 5 }}>
          {formattedMonthlyIncome}
        </Text>
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
      <Card>
        <Card.Title>Monthly Divider</Card.Title>
        <Card.Divider />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginVertical: 7,
          }}
        >
          Saving | Spending
        </Text>
        <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 7 }}>
          {dividerValue}% | {100 - dividerValue}%
        </Text>
        <Slider
          minimumValue={0}
          step={1}
          onSlidingComplete={StoreSpendingDivider}
          value={dividerValue}
          onValueChange={setdividerValue}
          maximumValue={100}
          thumbStyle={{ height: 25, width: 25, backgroundColor: "#92c5eb" }}
        ></Slider>
      </Card>
      <Card>
        <Card.Title>Spending Budget</Card.Title>
        <Card.Divider />
        <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 7 }}>
          Rp{" "}
          {((monthlyIncome * (100 - dividerValue)) / 100).toLocaleString(
            "id-ID",
            { minimumFractionDigits: 0 }
          )}
        </Text>
        <Button
          onPress={() => {
            router.push("modal/SpendingModal");
          }}
          size="sm"
          type="outline"
        >
          Details
        </Button>
      </Card>
      <Card>
        <Card.Title>Saving Budget</Card.Title>
        <Card.Divider />
        <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 7 }}>
          Rp{" "}
          {((monthlyIncome * dividerValue) / 100).toLocaleString("id-ID", {
            minimumFractionDigits: 0,
          })}
        </Text>
        <Button
          onPress={() => {
            router.push("modal/SavingModal");
          }}
          size="sm"
          type="outline"
        >
          Details
        </Button>
      </Card>
    </View>
  );
}
