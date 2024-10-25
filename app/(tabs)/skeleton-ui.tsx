import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { animated, useSpring } from "react-spring";

const boxColor = "#c0c0c0";
const contentColor = "#919191";

export default function SkeletonUI() {
  const AnimatedBox = animated(View);
  const [springs, api] = useSpring(() => ({ from: { opacity: 0.85 } }));

  useFocusEffect(
    useCallback(() => {
      api.start({
        from: { opacity: 0.85 },
        to: { opacity: 0.45 },
        loop: { reverse: true },
        config: { duration: 700 },
      });

      return () => api.stop();
    }, [api])
  );

  return (
    <View style={styles.container}>
      <AnimatedBox style={{ ...styles.box, ...springs }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View style={styles.userImage} />
          <View style={styles.userName} />
        </View>
        <View style={styles.contentArea}>
          {Array.from({ length: 4 }, (_, i) => i).map((i) => (
            <View
              key={i}
              style={{ ...styles.content }}
            ></View>
          ))}
          <View style={{ ...styles.content, width: 200 }}>
            <View style={styles.content} />
          </View>
        </View>
      </AnimatedBox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  box: {
    padding: 40,
    backgroundColor: boxColor,
    borderRadius: 24,
    width: 320,
    // height: 500,
  },
  userImage: {
    backgroundColor: contentColor,
    borderRadius: 25,
    width: 46,
    height: 46,
  },
  userName: {
    borderRadius: 12,
    backgroundColor: contentColor,
    width: 140,
    height: 20,
  },
  contentArea: {
    paddingHorizontal: 12,
    marginTop: 20,
    gap: 10,
  },
  content: {
    borderRadius: 8,
    backgroundColor: contentColor,
    height: 12,
  },
});
