import { ScrollView, StyleSheet, View } from "react-native";
import { animated, useSpring } from "react-spring";

const boxColor = "#c0c0c0";
const contentColor = "#919191";

export default function SkeletonList() {
  return (
    <ScrollView>
      <View style={styles.container}>
        {Array.from({ length: 20 }, (_, i) => i).map((i) => (
          <Item
            key={i}
            index={i}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 16,
    marginBottom: 30,
  },
});

const Item = ({ index = 0 }: { index?: number }) => {
  const AnimatedView = animated(View);
  const springs = useSpring({
    from: { opacity: 0.85 },
    to: { opacity: 0.45 },
    loop: { reverse: true },
    config: { duration: 700 },
  });

  const seed = 540;
  const [minTitleWidth, maxTitleWidth] = [120, 180];
  const [minContentWidth, maxContentWidth] = [100, 200];

  // 넓이 계산 공식
  const titleWidth =
    (((Math.sin(seed * (index + 1)) + 1) * 10000) %
      (maxTitleWidth - minTitleWidth + 1)) +
    minTitleWidth;

  const contentWidth =
    (((Math.cos(seed * (index + 1)) + 1) * 10000) %
      (maxContentWidth - minContentWidth + 1)) +
    minContentWidth;

  return (
    <>
      <AnimatedView style={{ ...itemStyles.listItemBox, ...springs }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={[itemStyles.content, { width: 110, height: 12 }]} />
          <View style={[itemStyles.content, { width: 60, height: 10 }]} />
        </View>
        <View style={[itemStyles.content, { width: titleWidth, height: 16 }]} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={[itemStyles.content, { width: contentWidth, height: 10 }]}
          />
          <View style={[itemStyles.content, { width: 20, height: 12 }]} />
        </View>
      </AnimatedView>
    </>
  );
};

const itemStyles = StyleSheet.create({
  listItemBox: {
    backgroundColor: boxColor,
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  content: {
    backgroundColor: contentColor,
    borderRadius: 50,
  },
});
