import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { PostDto } from "../../types/post";

export default function Posts() {
  const [posts, setPosts] = useState<PostDto[] | null>(null);

  useEffect(() => {
    // 해당 코드를 반복문으로 변경
    const testPosts: PostDto[] = [];
    for (let i = 1; i <= 15; i++) {
      testPosts.push({
        id: i,
        title: `게시글 ${i}`,
        content: `게시글 ${i} 내용`,
      });
    }

    setPosts(testPosts);
  }, []);

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listWrap}
        renderItem={({ item }) => (
          <Link
            style={styles.postItem}
            href={{
              pathname: "/posts/[id]/post", // [id] : 동적 라우팅
              params: { id: item.id, title: item.title, content: item.content }, // params : 원하는는 파라미터를 전달
            }}
          >
            {item.title}
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listWrap: {
    paddingTop: 60,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  postItem: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
});
