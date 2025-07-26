import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";

export default function TabLayout() {
  return (
    // Tabs screenOptions={{ headerShown: false }} : 헤더를 없앤다.
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          // tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
          title: "홈",
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: "게시글",
          // tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.navigate("/(tabs)/posts/page");
          },
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          title: "글쓰기",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="add-outline"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.replace("/(tabs)/write");
          },
        }}
      />
      <Tabs.Screen
        name="myPage"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? "black" : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
