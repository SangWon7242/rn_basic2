import { Redirect } from "expo-router";

export default function App() {
  // 기본 경로를 탭 내의 첫 번째 탭으로 리다이렉트
  return (
    <Redirect
      href={{
        pathname: "/(tabs)/home",
      }}
    />
  );
}
