import { auth } from "@/firebase/config";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SignUpScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CreateAccountForm({
  onBack,
  onSuccess,
}: SignUpScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 이메일 유효성 검사
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 유효성 검사
  const isValidPassword = (password: string) => {
    return password.length >= 6;
  };

  // 폼 유효성 검사
  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert("오류", "이메일을 입력해주세요.");
      return false;
    }

    if (!isValidEmail(email)) {
      Alert.alert("오류", "올바른 이메일 형식을 입력해주세요.");
      return false;
    }

    if (!password) {
      Alert.alert("오류", "비밀번호를 입력해주세요.");
      return false;
    }

    if (!isValidPassword(password)) {
      Alert.alert("오류", "비밀번호는 최소 6자 이상이어야 합니다.");
      return false;
    }

    if (!confirmPassword) {
      Alert.alert("오류", "비밀번호 확인을 입력해주세요.");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  // 회원가입 처리
  const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("회원가입 완료", "회원가입이 완료되었습니다!", [
        { text: "확인", onPress: onSuccess },
      ]);
    } catch (error: any) {
      let errorMessage = "회원가입 중 오류가 발생했습니다.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "이미 사용 중인 이메일입니다.";
          break;
        case "auth/invalid-email":
          errorMessage = "올바르지 않은 이메일 형식입니다.";
          break;
        case "auth/weak-password":
          errorMessage = "비밀번호가 너무 약합니다.";
          break;
        case "auth/network-request-failed":
          errorMessage = "네트워크 연결을 확인해주세요.";
          break;
      }

      Alert.alert("회원가입 실패", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>회원가입</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 로고 */}
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <View style={styles.carrotTop} />
              <View style={styles.carrotBody}>
                <View style={styles.carrotCenter} />
              </View>
            </View>
            <Text style={styles.logoText}>당근마켓과 함께하세요!</Text>
          </View>

          {/* 폼 */}
          <View style={styles.formContainer}>
            {/* 이메일 입력 */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>이메일</Text>
              <TextInput
                style={[
                  styles.input,
                  email && !isValidEmail(email) && styles.inputError,
                ]}
                placeholder="example@email.com"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {email && !isValidEmail(email) && (
                <Text style={styles.errorText}>
                  올바른 이메일 형식을 입력해주세요
                </Text>
              )}
            </View>

            {/* 비밀번호 입력 */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>비밀번호</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    password && !isValidPassword(password) && styles.inputError,
                  ]}
                  placeholder="최소 6자 이상"
                  placeholderTextColor="#888"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              {password && !isValidPassword(password) && (
                <Text style={styles.errorText}>
                  비밀번호는 최소 6자 이상이어야 합니다
                </Text>
              )}
            </View>

            {/* 비밀번호 확인 입력 */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>비밀번호 확인</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    confirmPassword &&
                      password !== confirmPassword &&
                      styles.inputError,
                  ]}
                  placeholder="비밀번호를 다시 입력해주세요"
                  placeholderTextColor="#888"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
              {confirmPassword && password !== confirmPassword && (
                <Text style={styles.errorText}>
                  비밀번호가 일치하지 않습니다
                </Text>
              )}
            </View>

            {/* 회원가입 버튼 */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                (!email || !password || !confirmPassword || loading) &&
                  styles.signUpButtonDisabled,
              ]}
              onPress={handleSignUp}
              disabled={!email || !password || !confirmPassword || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.signUpButtonText}>회원가입</Text>
              )}
            </TouchableOpacity>

            {/* 로그인 링크 */}
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => console.log("로그인")}
            >
              <Text style={styles.loginLinkText}>
                이미 계정이 있나요?{" "}
                <Text style={styles.loginLinkHighlight}>로그인</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 34, // backButton과 같은 크기
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoIcon: {
    alignItems: "center",
    marginBottom: 15,
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
  logoText: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#3C3C3C",
    color: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "#FF4444",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3C3C3C",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  passwordInput: {
    flex: 1,
    color: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 15,
  },
  errorText: {
    color: "#FF4444",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  signUpButton: {
    backgroundColor: "#FF6F0F",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  signUpButtonDisabled: {
    backgroundColor: "#666666",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    alignItems: "center",
    marginBottom: 20,
  },
  loginLinkText: {
    color: "#CCCCCC",
    fontSize: 14,
  },
  loginLinkHighlight: {
    color: "#FF6F0F",
    fontWeight: "bold",
  },
});
