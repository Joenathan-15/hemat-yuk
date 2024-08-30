import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getSelectedWishlist, Wishlist } from "../../../lib/AccessStorage";
import { FormatCurrency } from "../../../lib/FormatCurrency";
import { Card, Slider } from "@rneui/themed";
import { monthDiff } from "../../../lib/Date";

export default function WishListDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [wishlist, setwishlist] = useState<Wishlist>();
  const [progress, setProgress] = useState<number>(0);
  const [totalSaving, setTotalSaving] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      const getWishlist = async () => {
        const wisheslist = await getSelectedWishlist(id);
        wisheslist.map((wishlist) => {
          setwishlist(wishlist);
        });
      };
      getWishlist();
      setLoading(false);
    }, [])
  );

  useEffect(() => {
    const monthlypayment: number = wishlist?.monthlyPayment ? +wishlist?.monthlyPayment : 0;
    const price : number = wishlist?.price ? +wishlist?.price : 0
    const paid = monthDiff(wishlist?.wishlistCreated ? wishlist.wishlistCreated : "0") * monthlypayment;
      if(paid == 0){
        setProgress(0);
      }else{
        const percentage: number = (paid/price) * 100;
        setTotalSaving(paid)
        setProgress(percentage);
      }
  });
  return (
    <View>
      {loading ? (<Text>Loading</Text>) : (
            <View>
            <View>
              <Card>
                <Card.Title>{wishlist?.name}</Card.Title>
                <Text>Target Saving : {FormatCurrency(wishlist?.price ? wishlist?.price : "0")}</Text>
                <Text>Every month saving : {FormatCurrency(wishlist?.monthlyPayment ? wishlist?.monthlyPayment : "0" )}</Text>
                <Text>Total Saving : {FormatCurrency(totalSaving ? totalSaving.toString() : "0")}</Text>
                <Text>Saved : {progress ? progress.toFixed(2) : 0}%</Text>
                <Slider
                  disabled
                  value={progress ? progress : 0}
                  maximumValue={100}
                  thumbStyle={{
                    height: 1,
                    width: 1,
                    backgroundColor: "transparent",
                  }}
                />
              </Card>
            </View>
          </View>
      
      )}
    </View>
  );
}
