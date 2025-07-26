import { Stack, useLocalSearchParams } from "expo-router";

export default function PostLayout() {
  // useLocalSearchParams : 현재 페이지의 파라미터를 가져온다.
  const { postId } = useLocalSearchParams();

  return <Stack screenOptions={{ title: `${postId}번 게시글` }} />;
}
