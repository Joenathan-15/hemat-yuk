import { Button, Card, Slider, Text } from "@rneui/themed";
import { router, useFocusEffect } from "expo-router";
import { View } from "react-native";
import { FormatCurrency } from "../../lib/FormatCurrency";
import { useCallback, useEffect, useState } from "react";
import { monthDiff } from "../../lib/Date";

export default function WishCard({ ...prop }) {
  const [price, setPrice] = useState<string>();
  const [progress, setProgress] = useState<number>();
  const [totalSaving, setTotalSaving] = useState<number>();
  useFocusEffect(
    useCallback(() => {
      const FormatNumber = async () => {
        setPrice(FormatCurrency(prop.price));
      };
      
      const monthlypayment: number = prop?.monthlyPayment
      ? +prop?.monthlyPayment
      : 0;
      const price: number = prop?.price ? +prop?.price : 0;
      const paid =
      monthDiff(prop?.wishlistCreated ? prop.wishlistCreated : "0") *
      monthlypayment;
      if (paid == 0) {
        setProgress(0);
      } else {
        const percentage: number = (paid / price) * 100;
        setTotalSaving(paid);
        setProgress(percentage);
      }
      
      FormatNumber();
}, [prop.price, price])
  );
  return (
    <Card>
      <Card.Title>{prop.name}</Card.Title>
      <Card.Divider />
      <View style={{ marginVertical: 10 }}>
        <Text>Target : {price}</Text>
        <Slider
          disabled
          value={progress}
          maximumValue={100}
          thumbStyle={{
            height: 1,
            width: 1,
            backgroundColor: "transparent",
          }}
        />
        <Text style={{ textAlign: "right" }}>{FormatCurrency(totalSaving ? totalSaving.toString() : "0")}</Text>
      </View>
      <Button
        onPress={() => {
          router.push(`modal/WishlistDetail/${prop.id}`);
        }}
        type="clear"
      >
        Details
      </Button>
    </Card>
  );
}
