import { Button, Card, Input, Slider, Text } from "@rneui/themed";
import { useCallback, useState } from "react";
import { View } from "react-native";
import {
  GetMonthlyIncome,
  GetSpendingDivider,
  StoreWishlist,
} from "../../lib/AccessStorage";
import { router, useFocusEffect } from "expo-router";
import { FormatCurrency } from "../../lib/FormatCurrency";

export default function AddWishlist() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [savingIncome, setSavingIncome] = useState<number>(0);
  const [formattedMonthlyIncome, setFormattedMonthlyIncome] =
    useState<string>("");
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const CalculateSavingIncome = async () => {
        const MonthlyIncome = await GetMonthlyIncome();
        const NumberMonthlyIncome = MonthlyIncome ? +MonthlyIncome : 0;
        const SpendingDivider = await GetSpendingDivider();
        const NumberSpendingDivider = SpendingDivider ? +SpendingDivider : 0;
        const SavingIncome =
          (NumberMonthlyIncome * NumberSpendingDivider) / 100;
        setSavingIncome(SavingIncome);
      };
      CalculateSavingIncome();
    }, [])
  );

  async function onSliderChange(dividedValue: number) {
    setFormattedMonthlyIncome(
      FormatCurrency(((savingIncome * dividedValue) / 100).toString())
    );
    calculateMonthlyPayment(dividedValue);
  }

  function FieldValidation(): boolean {
    if (name !== "" && price !== "") {
      return true;
    } else {
      return false;
    }
  }

  function calculateMonthlyPayment(value: number) {
    const result = (savingIncome * value) / 100;
    setMonthlyPayment(result);
  }

  function SaveWishlist() {
    if (FieldValidation()) {
      StoreWishlist({ name, price, monthlyPayment });
      router.dismissAll();
    } else {
      if (name == "") {
        setNameError("This Field Are Required");
      }
      if (price == "") {
        setPriceError("This Field Are Required");
      }
    }
  }

  return (
    <View>
      <Card>
        <Input
          errorMessage={nameError}
          value={name}
          onChangeText={(newName) => setName(newName)}
          placeholder="Wishlist Name"
        />
        <Input
          errorMessage={priceError}
          value={price}
          onChangeText={(newPrice) => setPrice(newPrice)}
          placeholder="Wishlist Price"
          keyboardType="decimal-pad"
        ></Input>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text>Monthly Payment</Text>
          <Text>
            {formattedMonthlyIncome ? formattedMonthlyIncome : "Rp 0"}
          </Text>
        </View>
        <Slider
          minimumValue={0}
          step={1}
          value={0}
          onValueChange={onSliderChange}
          maximumValue={100}
          thumbStyle={{ height: 25, width: 25, backgroundColor: "#92c5eb" }}
        ></Slider>
        <Button onPress={SaveWishlist}>Add Wishlist</Button>
      </Card>
    </View>
  );
}
