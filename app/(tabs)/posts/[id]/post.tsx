import { db } from "@/firebase/config";
import { PostWithContentDto } from "@/types/post";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function Post() {
  // useLocalSearchParams : 현재 페이지의 파라미터를 가져온다.
  const { id } = useLocalSearchParams();

  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // firebase 문서 참조 방식이 효율적
        const postSnap = await getDoc(doc(db, "posts", id as string));

        if (postSnap.exists()) {
          const post = postSnap.data() as PostWithContentDto;
          setPost(post);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
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
          <Text style={styles.postBody}>{post.content}</Text>
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
