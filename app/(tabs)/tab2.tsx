import { animated, useSpring } from "react-spring";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function TabTwoScreen() {
  const AnimatedView = animated(View);
  const [springs, api] = useSpring(() => ({ from: { x: 0 } }));

  const handlePress = () => {
    api.start({
      from: { x: 0 },
      to: { x: 100 },
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <AnimatedView
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#ff6d6d",
            borderRadius: 8,
            ...springs,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
