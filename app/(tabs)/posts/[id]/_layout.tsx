import { Stack, useLocalSearchParams } from "expo-router";

export default function PostLayout() {
  // useLocalSearchParams : 현재 페이지의 파라미터를 가져온다.
  const { id } = useLocalSearchParams();
  return <Stack screenOptions={{ title: `${id}번 게시글` }} />;
}
