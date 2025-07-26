import { Ionicons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function PostWriteForm() {
  const router = useRouter();

  const handleSubmit = () => {
    console.log("완료");
  };

  const selectCategory = () => {
    console.log("카테고리 선택");
  };

  const selectImage = () => {
    console.log("사진 선택");
  };

  const selectHashtag = () => {
    console.log("해시태그 선택");
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.formInner}>
        <View style={styles.formHeader}>
          <View style={styles.headerTop}>
            {/* navigation.goBack() : 뒤로가기 */}
            <Pressable onPress={() => router.navigate("/(tabs)/posts/page")}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
            <Pressable onPress={handleSubmit}>
              <Text style={styles.formSubmit}>완료</Text>
            </Pressable>
          </View>
          <View style={styles.headerBottom}>
            <Pressable onPress={selectCategory} style={styles.selectCategory}>
              <Text style={styles.formSubmit}>
                게시글의 주제를 선택해주세요.
              </Text>
              <Ionicons name="chevron-forward" size={24} color="black" />
            </Pressable>
          </View>
        </View>
        <KeyboardAvoidingView
          style={styles.formBody}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView contentContainerStyle={styles.formBodyInner}>
            <View style={styles.formTitleContainer}>
              <TextInput
                style={styles.formTitleInput}
                placeholder="제목을 입력해주세요."
                autoFocus={false}
                showSoftInputOnFocus={true}
              />
            </View>
            <View style={styles.formContentContainer}>
              <TextInput
                style={styles.formContentInput}
                placeholder="여러분의 이야기를 나눠주세요."
                textAlignVertical="top"
                autoFocus={false}
                showSoftInputOnFocus={true}
                multiline
              />
            </View>
          </ScrollView>
          <View style={styles.contentFooter}>
            <Pressable style={styles.footerItem} onPress={selectImage}>
              <Ionicons name="camera-outline" size={20} color="black" />
              <Text style={styles.footerText}>사진</Text>
            </Pressable>
            <Pressable style={styles.footerItem} onPress={selectHashtag}>
              <Octicons name="hash" size={20} color="black" />
              <Text style={styles.footerText}>해시태그</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingTop: 60,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerBottom: {
    paddingVertical: 15,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  formInner: {
    flex: 1,
  },
  formHeader: {},
  formSubmit: {
    fontWeight: "bold",
  },
  selectCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formBody: {
    paddingTop: 10,
    marginHorizontal: 10,
    flex: 1,
  },
  formBodyInner: {
    flex: 1,
  },
  formTitleContainer: {},
  formTitleInput: {
    fontSize: 15,
    fontWeight: "bold",
  },
  formContentContainer: {
    flex: 1,
  },
  formContentInput: {
    fontSize: 13,
    flex: 1,
  },
  contentFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  footerText: {
    marginLeft: 5,
    fontSize: 13,
  },
});
