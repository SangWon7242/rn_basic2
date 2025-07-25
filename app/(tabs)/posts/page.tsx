import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function Posts() {
  const [posts, setPosts] = useState<
    { id: number; title: string; content: string }[]
  >([]);

  useEffect(() => {
    setPosts([
      { id: 1, title: "게시글 1", content: "게시글 1 내용" },
      { id: 2, title: "게시글 2", content: "게시글 2 내용" },
      { id: 3, title: "게시글 3", content: "게시글 3 내용" },
      { id: 4, title: "게시글 4", content: "게시글 4 내용" },
      { id: 5, title: "게시글 5", content: "게시글 5 내용" },
      { id: 6, title: "게시글 6", content: "게시글 6 내용" },
      { id: 7, title: "게시글 7", content: "게시글 7 내용" },
      { id: 8, title: "게시글 8", content: "게시글 8 내용" },
      { id: 9, title: "게시글 9", content: "게시글 9 내용" },
      { id: 10, title: "게시글 10", content: "게시글 10 내용" },
      { id: 11, title: "게시글 11", content: "게시글 11 내용" },
      { id: 12, title: "게시글 12", content: "게시글 12 내용" },
      { id: 13, title: "게시글 13", content: "게시글 13 내용" },
      { id: 14, title: "게시글 14", content: "게시글 14 내용" },
      { id: 15, title: "게시글 15", content: "게시글 15 내용" },
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
