import { useLocalSearchParams } from "expo-router";
import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

export default function Post() {
  // useLocalSearchParams : 현재 페이지의 파라미터를 가져온다.
  const { id, title, content } = useLocalSearchParams();

  return (
    <View style={styles.postContainer}>
      <View style={styles.postInner}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.postContent}>{content}</Text>
      </View>
    </View>
  );
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    alignItems: "center",
  },
  postInner: {
    padding: 16,
    backgroundColor: "white",
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    width: width - 16,
    height: 100,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: "#666",
  },
});
