import ProtectedRoute from "@/components/protected-route";
import { Redirect } from "expo-router";

export default function App() {
  return (
    <ProtectedRoute>
      <Redirect
        href={{
          pathname: "/(tabs)/home",
        }}
      />
    </ProtectedRoute>
  );
}
