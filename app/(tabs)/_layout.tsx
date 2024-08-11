import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#92c5eb' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Target"
        options={{
          title: 'Target',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="bullseye" color={color} />,
        }}
      />
    </Tabs>
  );
}
