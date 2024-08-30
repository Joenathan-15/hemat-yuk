import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal/EditIncomeModal"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Edit Income",
        }}
      />
      <Stack.Screen
        name="modal/SavingModal"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Saving Details",
        }}
      />
      <Stack.Screen
        name="modal/SpendingModal"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Spending Details",
        }}
      />
      <Stack.Screen
        name="modal/AddWishlistModal"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Add Wishlist",
        }}
      />
      <Stack.Screen
        name="modal/WishlistDetail/[id]"
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Wishlist Details",
        }}
      />
    </Stack>
  );
}
