import { useFocusEffect, useRouter } from "expo-router";
import { StyleSheet, View, Text } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  useFocusEffect(() => {
    router.navigate("/refresh");
  });

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>React Native Spring Practice</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
