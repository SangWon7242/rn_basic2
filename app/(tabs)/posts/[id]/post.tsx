import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import type { PostWithContentDto } from "../../../types/post";

export default function Post() {
  // useLocalSearchParams : 현재 페이지의 파라미터를 가져온다.
  const { id, title, content } = useLocalSearchParams();

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    setPost({
      id: Number(id),
      title: title as string, // 타입을 명시적으로 지정
      content: content as string,
    });
  }, []);

  // 가드 클로즈 패턴
  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>로딩중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.postContainer}>
      <View style={styles.postInner}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
      </View>
    </View>
  );
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  postContainer: {
    flex: 1,
    alignItems: "center",
  },
  postInner: {
    padding: 16,
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    width: width - 16,
    height: 100,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: "#666",
  },
});
