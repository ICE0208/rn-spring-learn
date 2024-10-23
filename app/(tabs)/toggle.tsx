import { useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { animated, useSpring } from "react-spring";

export default function AnimatingAuto() {
  const AnimatedView = animated(View);
  const [toggle, setToggle] = useState(false);

  const springs = useSpring({
    backgroundColor: toggle ? "#0D92F4" : "#C62E2E",
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setToggle((prev) => !prev)}
      >
        <AnimatedView
          style={{ borderRadius: 30, width: 240, height: 240, ...springs }}
        />
      </TouchableOpacity>
    </View>
  );
}
