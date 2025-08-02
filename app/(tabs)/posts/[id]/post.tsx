import { db } from "@/firebase/config";
import { PostWithContentDto } from "@/types/post";
import {
  Feather,
  FontAwesome6,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Post() {
  const router = useRouter();

  // useLocalSearchParams : 동적 라우팅을 위한 파라미터
  // 받아온 파라미터를 문자열로 처리
  const { id } = useLocalSearchParams();

  const [post, setPost] = useState<PostWithContentDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    try {
      // firebase는 문서 참조 방식
      const postRef = doc(db, "posts", id as string);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const post = postSnap.data() as PostWithContentDto;
        setPost(post);
      }
    } catch (error) {
      console.log("오류 발생 : " + error);
      setError("오류 발생");
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  // 가드 클로즈 패턴
  if (!post) {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.loadingText}>로딩중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.postContainer}>
      <View style={styles.postInner}>
        <View style={styles.postHeader}>
          <View style={styles.postHeaderLeft}>
            <TouchableOpacity onPress={() => router.back()}>
              <Octicons name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.postHeaderRight}>
            <TouchableOpacity onPress={() => console.log("bell")}>
              <Octicons name="bell" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("upload")}>
              <Feather name="upload" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("dots-vertical")}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.postContentContainer}>
          <View style={styles.contentHeader}>
            <View style={styles.profileImage}>
              <TouchableOpacity onPress={() => console.log("MyPage")}>
                <FontAwesome6 name="user-circle" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileNickname}>닉네임</Text>
              <Text style={styles.profileDate}>2025년 7월 27일</Text>
            </View>
          </View>
          <View style={styles.contentBody}>
            <View style={styles.contentTitleWrap}>
              <Text style={styles.postTitle}>{post?.title}</Text>
            </View>
            <View style={styles.contentBodyWrap}>
              <Text style={styles.postBody}>{post?.content}</Text>
            </View>
            <View style={styles.contentFooter}>
              <TouchableOpacity
                onPress={() => console.log("recommend")}
                style={styles.contentFooterItem}
              >
                <Feather name="thumbs-up" size={18} color="black" />
                <Text>추천</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log("save")}
                style={styles.contentFooterItem}
              >
                <Text>저장</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.postReplyContainer}>
        <View style={styles.postReplyInner}>
          <View>
            <Text style={{ fontWeight: "bold" }}>댓글0</Text>
          </View>
          <View style={styles.postReplyContent}>
            <Text>아직 댓글이 없어요.</Text>
            <Text>가장 먼저 댓글을 남겨보세요.</Text>
          </View>
        </View>
      </View>
      <View style={styles.postReplyInputContainer}>
        <View style={styles.postReplyInputInner}>
          <Text style={{ fontWeight: "bold" }}>댓글 입력창</Text>
        </View>
      </View>
    </View>
  );
}

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 60,
    gap: 5,
  },
  loadingText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  postInner: {
    width: WIDTH,
    backgroundColor: "#fff",
    flex: 0.6,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  postHeaderLeft: {},
  postHeaderRight: {
    flexDirection: "row",
    gap: 10,
  },
  postContentContainer: {
    padding: 10,
    flexGrow: 1,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    gap: 10,
  },
  profileImage: {},
  profileInfo: {},
  profileNickname: {
    fontWeight: "bold",
  },
  profileDate: {
    fontSize: 13,
    color: "#666",
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    paddingVertical: 8,
  },
  contentBody: {
    flexGrow: 1,
  },
  contentTitleWrap: {},
  contentBodyWrap: {
    flex: 1,
  },
  contentFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  contentFooterItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  postBody: {
    flex: 1,
    fontSize: 16,
  },
  postReplyContainer: {
    width: WIDTH,
    backgroundColor: "#fff",
    flex: 0.3,
  },
  postReplyInner: {
    padding: 10,
    flex: 1,
  },
  postReplyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postReplyInputContainer: {
    width: WIDTH,
    backgroundColor: "#fff",
    flex: 0.1,
  },
  postReplyInputInner: {
    padding: 10,
  },
});
