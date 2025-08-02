import { auth } from "@/firebase/config";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface LoginFormProps {
  onBack: () => void;
  onSignUp: () => void;
}

export default function LoginForm({ onBack, onSignUp }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 입력값 검증
  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert("입력 오류", "이메일을 입력해주세요.");
      return false;
    }

    if (!password.trim()) {
      Alert.alert("입력 오류", "비밀번호를 입력해주세요.");
      return false;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("입력 오류", "올바른 이메일 형식을 입력해주세요.");
      return false;
    }

    return true;
  };

  // 🔥 로그인 처리 함수
  const handleLogin = async (email: string, password: string) => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // 로그인
      await signInWithEmailAndPassword(auth, email, password);
      console.log("로그인 성공");
      // 메인 화면으로 이동 또는 상태 업데이트
      router.replace("/(tabs)/home");
    } catch (error: any) {
      let errorMessage = "로그인 중 오류가 발생했습니다.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "등록되지 않은 이메일입니다.";
          break;
        case "auth/wrong-password":
          errorMessage = "비밀번호가 올바르지 않습니다.";
          break;
        case "auth/invalid-email":
          errorMessage = "올바르지 않은 이메일 형식입니다.";
          break;
        case "auth/too-many-requests":
          errorMessage = "너무 많은 시도로 인해 잠시 후 다시 시도해주세요.";
          break;
      }

      Alert.alert("로그인 실패", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* 🔥 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>로그인</Text>
          <View style={styles.placeholder} />
        </View>

        {/* 🔥 로고 섹션 */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>🥕</Text>
          </View>
          <Text style={styles.welcomeText}>다시 오신 것을 환영합니다!</Text>
          <Text style={styles.subtitleText}>계정에 로그인하세요</Text>
        </View>

        {/* 🔥 로그인 폼 */}
        <View style={styles.formContainer}>
          {/* 이메일 입력 */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#CCCCCC"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="이메일"
              placeholderTextColor="#888888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* 비밀번호 입력 */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#CCCCCC"
              style={styles.inputIcon}
            />
            <TextInput
              style={[styles.textInput, { flex: 1 }]}
              placeholder="비밀번호"
              placeholderTextColor="#888888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#CCCCCC"
              />
            </TouchableOpacity>
          </View>

          {/* 로그인 버튼 */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={() => handleLogin(email, password)}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.loginButtonText}>로그인</Text>
            )}
          </TouchableOpacity>

          {/* 비밀번호 찾기 */}
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>
              비밀번호를 잊으셨나요?
            </Text>
          </TouchableOpacity>
        </View>

        {/* 🔥 회원가입 링크 */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>계정이 없으신가요? </Text>
          <TouchableOpacity onPress={() => onSignUp()}>
            <Text style={styles.signUpLink}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40, // backButton과 같은 크기로 중앙 정렬
  },
  logoSection: {
    alignItems: "center",
    marginVertical: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF6F0F",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitleText: {
    color: "#CCCCCC",
    fontSize: 16,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3C3C3C",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  eyeButton: {
    padding: 5,
  },
  loginButton: {
    backgroundColor: "#FF6F0F",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: "#FF6F0F80", // 50% 투명도
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordButton: {
    alignItems: "center",
  },
  forgotPasswordText: {
    color: "#FF6F0F",
    fontSize: 14,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingBottom: 30,
  },
  signUpText: {
    color: "#CCCCCC",
    fontSize: 14,
  },
  signUpLink: {
    color: "#FF6F0F",
    fontSize: 14,
    fontWeight: "bold",
  },
});
