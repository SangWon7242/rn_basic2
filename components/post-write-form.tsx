import { db } from "@/firebase/config";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Keyboard,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const useKeyboardHook = (toolbarHeight: number) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Animated 값들을 useRef로 생성
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyboardHideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardDidShowListener = Keyboard.addListener(
      keyboardShowEvent,
      (event) => {
        const { height } = event.endCoordinates;
        setKeyboardVisible(true);
        setKeyboardHeight(height);

        // Footer를 키보드 위로 이동 (음수 값으로 위로 이동)
        Animated.timing(keyboardOffset, {
          toValue: -height, // 키보드 위 10px 여백
          duration: Platform.OS === "ios" ? 250 : 200,
          useNativeDriver: true,
        }).start();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      keyboardHideEvent,
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);

        // 원래 위치로 복원
        Animated.timing(keyboardOffset, {
          toValue: 0,
          duration: Platform.OS === "ios" ? 250 : 200,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, [toolbarHeight]);

  return {
    keyboardVisible,
    keyboardHeight,
    keyboardOffset,
  };
};

export default function PostWriteForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [toolbarHeight, setToolbarHeight] = useState<number>(0);

  const onToolBarLayout = (event: any) => {
    /*
    const { x, y, width, height } = event.nativeEvent.layout;

    console.log(`컴포넌트 크기 : ${width} x ${height}`);
    console.log(`컴포넌트 위치 : ${x}, ${y}`);
    */

    const { height } = event.nativeEvent.layout;
    setToolbarHeight(height);
  };

  const { keyboardVisible, keyboardOffset } = useKeyboardHook(toolbarHeight);

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
      Alert.alert(error);
      return false;
    }

    if (!content.trim()) {
      setError("내용을 입력해주세요");
      Alert.alert(error);
      return false;
    }

    setError("");
    return true;
  }, [title, content]);

  // e: React.FormEvent <form> 태그의 이벤트
  const onSubmit = useCallback(async () => {
    if (validateForm()) {
      try {
        setIsLoading(true);

        await addDoc(collection(db, "posts"), {
          title: title.trim(),
          content: content.trim(),
          createDate: Timestamp.now(),
        });

        console.log("문서가 성공적으로 저장되었습니다.");

        // 폼 초기화 및 페이지 이동
        setTitle("");
        setContent("");
        setError("");

        Alert.alert("성공", "게시글이 등록되었습니다.");
        router.navigate("/(tabs)/posts/page");
      } catch (error) {
        console.error(error);
      }

      console.log("제출된 데이터:", { title, content });
    }

    setTitle("");
    setContent("");
    setIsLoading(false);
    setError("");

    router.navigate("/(tabs)/posts/page");
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

  const selectLocation = useCallback(() => {
    console.log("장소 선택");
  }, []);

  const selectVote = useCallback(() => {
    console.log("투표 선택");
  }, []);

  if (isLoading) {
    return <Text>로딩중...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[styles.inner, { paddingBottom: keyboardVisible ? 20 : 10 }]}
      >
        <View style={styles.statusBar}></View>

        {/* 네비게이션 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.navigate("/(tabs)/posts/page")}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeButton} onPress={onSubmit}>
            <Text style={styles.completeButtonText}>완료</Text>
          </TouchableOpacity>
        </View>

        {/* 주제 선택 영역 */}
        <TouchableOpacity style={styles.topicSelector} onPress={selectCategory}>
          <Text style={styles.topicText}>게시글의 주제를 선택해주세요.</Text>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>

        {/* 구분선 */}
        <View style={styles.divider} />
        {/* 제목 입력 */}

        <TextInput
          style={styles.titleInput}
          placeholder="제목을 입력하세요."
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
        {/* 내용 입력 (스크롤뷰 사용) */}
        <ScrollView style={styles.contentContainer}>
          <TextInput
            style={styles.contentInput}
            placeholder="이야기를 나눠보세요.
#맛집 #병원 #산책 ..."
            placeholderTextColor="#999"
            multiline
            value={content}
            onChangeText={setContent}
            textAlignVertical="top"
          />
        </ScrollView>

        {/* 하단 툴바 */}
        <Animated.View
          style={[
            styles.toolbar,
            { transform: [{ translateY: keyboardOffset }] },
          ]}
          onLayout={onToolBarLayout}
        >
          <TouchableOpacity style={styles.toolbarButton} onPress={selectImage}>
            <Ionicons name="image-outline" size={24} color="white" />
            <Text style={styles.toolbarText}>사진</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={selectLocation}
          >
            <Ionicons name="location-outline" size={24} color="white" />
            <Text style={styles.toolbarText}>장소</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton} onPress={selectVote}>
            <MaterialIcons name="how-to-vote" size={24} color="white" />
            <Text style={styles.toolbarText}>투표</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={selectHashtag}
          >
            <FontAwesome name="hashtag" size={24} color="white" />
            <Text style={styles.toolbarText}>태그</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  inner: {
    flex: 1,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
  },
  time: {
    color: "white",
    fontWeight: "bold",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  networkText: {
    color: "white",
    marginRight: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  completeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
  },
  topicSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  topicText: {
    color: "white",
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#333",
  },
  titleContainer: {},
  titleInput: {
    color: "white",
    fontSize: 18,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  contentContainer: {
    flexGrow: 1,
  },
  contentInput: {
    color: "white",
    fontSize: 16,
    padding: 15,
    height: "100%",
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  toolbarButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  toolbarText: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
  },
});
