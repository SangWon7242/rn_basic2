import { auth } from "@/firebase/config";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MyPage() {
  const router = useRouter();
  // 🔥 로그아웃 함수
  const handleLogout = async () => {
    Alert.alert("로그아웃", "정말 로그아웃하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: async () => {
          try {
            console.log("로그아웃 시도...");
            await signOut(auth);
            console.log("로그아웃 성공");
            // 🔥 signOut 후 onAuthStateChanged가 자동으로 호출되어 WelcomeScreen으로 이동
            // WelcomeScreen으로 이동
            router.replace("/");
          } catch (error: any) {
            console.error("로그아웃 오류:", error);
            Alert.alert("오류", "로그아웃 중 오류가 발생했습니다.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 프로필 정보 */}
      <View style={styles.profileInfo}>
        <Text style={styles.email}>{auth.currentUser?.email}</Text>
        <Text style={styles.displayName}>
          {auth.currentUser?.email || "사용자"}
        </Text>
      </View>

      {/* 로그아웃 버튼 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#FF4444" />
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    padding: 20,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 40,
    paddingVertical: 20,
  },
  email: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  displayName: {
    color: "#CCCCCC",
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3C3C3C",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FF4444",
  },
  logoutText: {
    color: "#FF4444",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
