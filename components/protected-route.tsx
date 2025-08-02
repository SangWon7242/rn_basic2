import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // currentUser : 로그인 여부를 알려줌
  // 로그인 되어있으면 children을 보여주고
  // 로그인 되어있지 않으면 null을 보여줌
  const [user, setUser] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 🔥 Firebase Auth 상태 변화 감지
    // onAuthStateChanged : Auth 상태 변화 감지 리스너
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth 상태 변화:", user ? "로그인됨" : "로그아웃됨");
      setUser(user);
      setIsLoading(false);
    });

    // 컴포넌트 언마운트 시 리스너 해제
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <WelcomeScreen />;
  }

  return children;
}
