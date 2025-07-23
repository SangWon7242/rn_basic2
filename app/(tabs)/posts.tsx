import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Posts() {
  // 하드코딩 : 데이터를 직접 작성
  const posts = [
    { id: 1, title: "게시글 1" },
    { id: 2, title: "게시글 2" },
    { id: 3, title: "게시글 3" },
    { id: 4, title: "게시글 4" },
    { id: 5, title: "게시글 5" },
  ];

  return (
    <View style={styles.postsContainer}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listWrap}
        renderItem={({ item }) => (
          <Text style={styles.postItem}>{item.title}</Text>
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
