// screens/WelcomeScreen.tsx
import CreateAccountForm from "@/components/forms/CreateAccountForm";
import LoginForm from "@/components/forms/LoginForm";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleSignUpSuccess = async (email: string, password: string) => {
    try {
      // Firebase는 회원가입 시 자동으로 로그인 상태가 됨
      console.log("회원가입 성공, 자동 로그인됨");
      setShowCreateAccountForm(false);
      // 메인 화면으로 이동
      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error("회원가입 후 처리 오류:", error);
      Alert.alert(
        "오류",
        "회원가입은 완료되었지만 로그인 처리 중 오류가 발생했습니다."
      );
    }
  };

  if (showCreateAccountForm) {
    return (
      <CreateAccountForm
        onBack={() => setShowCreateAccountForm(false)}
        onSuccess={handleSignUpSuccess}
      />
    );
  }

  if (showLoginForm) {
    return (
      <LoginForm
        onSubmit={() => setShowLoginForm(false)}
        onBack={() => setShowCreateAccountForm(false)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* 로고 영역 */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <View style={styles.carrotTop} />
            <View style={styles.carrotBody}>
              <View style={styles.carrotCenter} />
            </View>
          </View>
        </View>

        {/* 텍스트 영역 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>당신 근처의 당근</Text>
          <Text style={styles.subtitle}>동네라서 가능한 모든 것</Text>
          <Text style={styles.description}>
            지금 내 동네를 선택하고 시작해보세요!
          </Text>
        </View>

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => setShowCreateAccountForm(true)}
          >
            <Text style={styles.startButtonText}>시작하기</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton}>
            <Ionicons
              name="logo-github"
              size={20}
              color="#fff"
              style={styles.socialIcon}
            />
            <Text style={styles.googleButtonText}>GitHub로 계속하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => setShowLoginForm(true)}
          >
            <Text style={styles.loginText1}>이미 계정이 있나요?</Text>
            <Text style={styles.loginText2}>로그인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 60,
    alignItems: "center",
  },
  logoIcon: {
    alignItems: "center",
  },
  carrotTop: {
    width: 20,
    height: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    marginBottom: -5,
    transform: [{ rotate: "15deg" }],
  },
  carrotBody: {
    width: 60,
    height: 60,
    backgroundColor: "#FF6F0F",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  carrotCenter: {
    width: 15,
    height: 15,
    backgroundColor: "#2C2C2C",
    borderRadius: 7.5,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#FF6F0F",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    backgroundColor: "#4285F4",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  googleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialIcon: {
    marginRight: 10,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    gap: 5,
  },
  loginText1: {
    color: "#CCCCCC",
    fontSize: 14,
  },
  loginText2: {
    color: "#FF6F0F",
    fontSize: 14,
  },
});
