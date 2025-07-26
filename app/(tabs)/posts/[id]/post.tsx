import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import type { PostWithContentDto } from "../../../types/post";

export default function Post() {
  // useLocalSearchParams : 현재 페이지의 파라미터를 가져온다.
  const { userId, id, title, body } = useLocalSearchParams();

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    setPost({
      userId: Number(userId),
      id: Number(id),
      title: title as string, // 타입을 명시적으로 지정
      body: body as string,
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
        <View style={styles.postHeader}>
          <Text style={styles.postTitle}>제목</Text>
          <Text style={styles.postTitleContent}>{post.title}</Text>
        </View>
        <View style={styles.postBodyContainer}>
          <Text style={styles.postBody}>{post.body}</Text>
        </View>
      </View>
    </View>
  );
}

const WIDTH = Dimensions.get("window").width;

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
    width: WIDTH - 15,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postTitleContent: {
    fontSize: 16,
    color: "#333",
  },
  postBodyContainer: {
    marginTop: 5,
  },
  postBody: {
    fontSize: 16,
    marginTop: 5,
  },
});
