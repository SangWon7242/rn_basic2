import { auth } from "@/firebase/config";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // currentUser : 로그인 여부를 알려줌
  // 로그인 되어있으면 children을 보여주고
  // 로그인 되어있지 않으면 null을 보여줌
  const user = auth.currentUser;

  if (!user) {
    return <WelcomeScreen />;
  }

  return children;
}
