import { Text, View } from "react-native";

export default function LoginForm({
  onSubmit,
  onBack,
}: {
  onSubmit: (email: string, password: string, isSignUp: boolean) => void;
  onBack: () => void;
}) {
  return (
    <View>
      <Text>로그인폼</Text>
    </View>
  );
}
