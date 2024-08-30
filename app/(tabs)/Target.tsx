import { Button } from "@rneui/themed";
import { router, useFocusEffect } from "expo-router";
import { ScrollView, View } from "react-native";
import WishCard from "../components/WishCard";
import { useCallback, useState } from "react";
import { FetchWishlist, Wishlist } from "../../lib/AccessStorage";

export default function Target() {
  const [wishesList, setWishesList] = useState<Wishlist[]>();
  const GetWishlist = async () => {
    const Wishlist = await FetchWishlist();
    setWishesList(Wishlist);
  };
  useFocusEffect(
    useCallback(() => {
      GetWishlist();
    }, [GetWishlist])
  );
  return (
    <View style={{ marginVertical: 20 }}>
      <Button
        onPress={() => {
          router.push("modal/AddWishlistModal");
        }}
        size="md"
        style={{ marginTop: 5 }}
        type="solid"
      >
        Add Wishlist
      </Button>
      <ScrollView>
        {wishesList?.map((item) => (
          <WishCard
            name={item.name}
            price={item.price}
            id={item.id}
            monthlyPayment={item.monthlyPayment}
            wishlistCreated={item.wishlistCreated}
            key={item.id}
          />
        ))}
      </ScrollView>
    </View>
  );
}
