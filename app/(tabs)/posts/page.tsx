import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
// type : 타입을 가져오기 위한 키워드
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { PostDto } from "../../types/post";

export default function Posts() {
  const [posts, setPosts] = useState<PostDto[] | null>(null);

  const fetchPosts = async () => {
    try {
      const postsQuery = query(
        collection(db, "posts"), // collection : posts 컬렉션을 가져온다.
        orderBy("postId", "desc") // orderBy : id를 기준으로 내림차순 정렬
      );

      // postsSnap : posts 컬렉션의 데이터를 가져온다.
      const postsSnap = await getDocs(postsQuery);

      const postsData = postsSnap.docs.map((doc) => {
        const { postId, title, content } = doc.data();

        return {
          id: doc.id, // doc.id : 문서의 ID
          postId: Number(postId),
          title: title as string,
          content: content as string,
        };
      });

      setPosts(postsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 가드 클로즈 패턴
  if (!posts) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>로딩중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        contentContainerStyle={styles.listWrap}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postId}>{item.postId}번 게시글</Text>
            <Link
              href={{
                pathname: `/posts/[id]/post`, // [id] : 동적 라우팅
                params: {
                  // params : 동적 라우팅을 위한 파라미터
                  id: item.id,
                  postId: item.postId,
                  title: item.title,
                  content: item.content,
                },
              }}
            >
              <Text style={styles.postTitle}>{item.title}</Text>
            </Link>
          </View>
        )}
      />
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
  postsContainer: {
    flex: 1,
    alignItems: "center",
  },
  listWrap: {
    width: WIDTH - 16,
    paddingTop: 70,
    paddingBottom: 16,
    paddingHorizontal: 6,
  },
  postItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 100,
  },
  postId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postTitle: {
    fontSize: 16,
    marginTop: 5,
  },
});
