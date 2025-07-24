import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Posts() {
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    setPosts([
      { id: 1, title: "게시글 1" },
      { id: 2, title: "게시글 2" },
      { id: 3, title: "게시글 3" },
      { id: 4, title: "게시글 4" },
      { id: 5, title: "게시글 5" },
      { id: 6, title: "게시글 6" },
      { id: 7, title: "게시글 7" },
      { id: 8, title: "게시글 8" },
      { id: 9, title: "게시글 9" },
      { id: 10, title: "게시글 10" },
      { id: 11, title: "게시글 11" },
      { id: 12, title: "게시글 12" },
      { id: 13, title: "게시글 13" },
      { id: 14, title: "게시글 14" },
      { id: 15, title: "게시글 15" },
    ]);
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
              params: { id: item.id, title: item.title }, // params : 원하는는 파라미터를 전달
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
