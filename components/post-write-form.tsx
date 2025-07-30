import { Ionicons, Octicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const useKeyboardAware = (footerHeight: number) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // new Animated.Value(0) : 애니메이션을 위한 초기값
  // useRef : 애니메이션을 위한 초기값을 유지
  const footerMarginAnim = useRef(new Animated.Value(0)).current;

  // e.endCoordinates.height : 키보드가 완전히 올라왔을 때의 높이

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardVisible(true);
        const targetHeight = e.endCoordinates.height - footerHeight;
        // 키보드 높이에서 footer 높이를 뺀 값을 사용
        setKeyboardHeight(targetHeight);

        // 부드러운 애니메이션으로 marginBottom 조절
        Animated.timing(footerMarginAnim, {
          toValue: targetHeight,
          duration: Platform.OS === "ios" ? 250 : 200, // ios는 250ms, android는 200ms
          useNativeDriver: false, // layout 속성 변경이므로 false
        }).start();
      }
    );

    const hideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);

        // 부드러운 애니메이션으로 marginBottom을 0으로 복원
        Animated.timing(footerMarginAnim, {
          toValue: 0,
          duration: Platform.OS === "ios" ? 250 : 200,
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      showListener.remove(); // 키보드가 나타날 때의 리스너 제거
      hideListener.remove(); // 키보드가 사라질 때의 리스너 제거
    };
  }, [footerHeight, footerMarginAnim]); // footerHeight를 의존성 배열에 추가

  return { keyboardVisible, keyboardHeight, footerMarginAnim };
};

export default function PostWriteForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [footerHeight, setFooterHeight] = useState<number>(0);

  const onFooterLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setFooterHeight(height);
  };

  const { keyboardVisible, keyboardHeight, footerMarginAnim } =
    useKeyboardAware(footerHeight);

  // useFocusEffect : 화면이 포커스 될 때마다 실행
  useFocusEffect(
    // useCallback : 메모이제이션을 사용하여 함수를 재사용
    useCallback(() => {
      setTitle("");
      setContent("");
      setIsLoading(false);
      setError("");
    }, [])
  );

  // 폼 유효성 검사
  const validateForm = useCallback(() => {
    if (!title.trim()) {
      setError("제목을 입력해주세요");
      return false;
    }
    if (!content.trim()) {
      setError("내용을 입력해주세요");
      return false;
    }

    setError("");
    return true;
  }, [title, content]);

  const onSubmit = useCallback(() => {
    if (!validateForm()) {
      // 오류가 있으면 알림 표시
      Alert.alert("입력 오류", error);
      return;
    }

    console.log("제출된 데이터:", { title, content });
  }, [title, content]);

  const selectCategory = useCallback(() => {
    console.log("카테고리 선택");
  }, []);

  const selectImage = useCallback(() => {
    console.log("사진 선택");
  }, []);

  const selectHashtag = useCallback(() => {
    console.log("해시태그 선택");
  }, []);

  if (isLoading) {
    return <Text>로딩중...</Text>;
  }

  return (
    <View style={styles.formContainer}>
      <View style={styles.formInner}>
        <View style={styles.formHeader}>
          <View style={styles.headerTop}>
            {/* navigation.goBack() : 뒤로가기 */}
            <Pressable onPress={() => router.navigate("/(tabs)/posts/page")}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
            <Pressable onPress={onSubmit}>
              <Text style={styles.formSubmit}>완료</Text>
            </Pressable>
          </View>
          <View style={styles.headerBottom}>
            <Pressable onPress={selectCategory} style={styles.selectCategory}>
              <Text style={styles.formSubmit}>
                게시글의 주제를 선택해주세요.
              </Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </Pressable>
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.formBody}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView contentContainerStyle={styles.formBodyInner}>
            <View style={styles.formTitleContainer}>
              <TextInput
                style={styles.formTitleInput}
                placeholder="제목을 입력해주세요."
                autoFocus={false}
                showSoftInputOnFocus={true}
              />
            </View>
            <View style={styles.formContentContainer}>
              <TextInput
                style={styles.formContentInput}
                placeholder="여러분의 이야기를 나눠주세요."
                textAlignVertical="top"
                autoFocus={false}
                showSoftInputOnFocus={true}
                multiline
              />
            </View>
          </ScrollView>
          <Animated.View
            style={[styles.contentFooter, { marginBottom: footerMarginAnim }]}
            onLayout={onFooterLayout}
          >
            <Pressable style={styles.footerItem} onPress={selectImage}>
              <Ionicons name="camera-outline" size={20} color="black" />
              <Text style={styles.footerText}>사진</Text>
            </Pressable>
            <Pressable style={styles.footerItem} onPress={selectHashtag}>
              <Octicons name="hash" size={20} color="black" />
              <Text style={styles.footerText}>해시태그</Text>
            </Pressable>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingTop: 60,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerBottom: {
    paddingVertical: 15,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  formInner: {
    flex: 1,
  },
  formHeader: {},
  formSubmit: {
    fontWeight: "bold",
  },
  selectCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formBody: {
    paddingTop: 10,
    marginHorizontal: 10,
    flexGrow: 1,
  },
  formBodyInner: {
    flex: 1,
  },
  formTitleContainer: {},
  formTitleInput: {
    fontSize: 15,
    fontWeight: "bold",
  },
  formContentContainer: {
    flex: 1,
    flexGrow: 1,
  },
  formContentInput: {
    fontSize: 13,
    flex: 1,
  },
  contentFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  footerText: {
    marginLeft: 5,
    fontSize: 13,
  },
});
