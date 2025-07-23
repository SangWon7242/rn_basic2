import { Text, View } from "react-native";

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {posts.map((post) => (
        <Text key={post.id}>{post.title}</Text>
      ))}
    </View>
  );
}
