import useScrollRefresh from "@/hooks/useScrollRefresh";
import React, { useState, useEffect, useRef } from "react";
import { FlatList, Text, View, ActivityIndicator } from "react-native";
import { animated, useSpring } from "react-spring";
import Icons from "@expo/vector-icons/MaterialIcons";

const App = () => {
  const [data, setData] = useState<string[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // 초기 로딩 상태

  // 데이터를 로드하는 함수 (프로미스를 반환)
  const fetchData = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setData(
          Array.from({ length: 20 }, (_, i) => {
            const now = new Date().toLocaleTimeString("en-GB", {
              hour12: false,
            });
            return `Item ${i + 1} - ${now} updated`;
          })
        );
        resolve();
      }, 1500); // 1초 지연
    });
  };

  // 초기 로딩을 위해 useEffect 사용
  useEffect(() => {
    const loadInitialData = async () => {
      await fetchData();
      setIsInitialLoading(false);
    };
    loadInitialData();
  }, []);

  // useScrollRefresh 훅 사용하여 스크롤 새로고침 구현
  const {
    isRefreshing,
    handleScroll,
    handleScrollEndDrag,
    canRefresh,
    handleScrollStartDrag,
  } = useScrollRefresh(fetchData);

  const AnimatedIcons = animated(Icons);
  const AnimatedView = animated(View);
  const [springs, api] = useSpring(() => ({
    marginTop: 0,
    opacity: 0,
    rotate: 0,
  }));
  const [springs2, api2] = useSpring(() => ({ y: 0 }));

  const animationStep = useRef<"READY" | "CAN_REFRESH" | "IS_REFRESHING">(
    "READY"
  );

  useEffect(() => {
    if (canRefresh && animationStep.current === "READY") {
      api.start({
        opacity: 1,
        marginTop: 25,
        rotate: 360,
        config: { duration: 300 },
      });
      animationStep.current = "CAN_REFRESH";
    }

    if (isRefreshing && animationStep.current === "CAN_REFRESH") {
      api.start({ cancel: "rotate" });
      const curRotateValue = springs.rotate.get();
      api.start({
        from: { rotate: curRotateValue },
        to: { rotate: curRotateValue + 360 },
        config: { duration: 800 },
        loop: true, // 명시적으로 무한 반복
      });
      api2.start({
        y: 40,
      });
      animationStep.current = "IS_REFRESHING";
    }

    if (!isRefreshing && animationStep.current === "IS_REFRESHING") {
      api.stop(); // 명시적으로 애니메이션 중지
      api.start({ opacity: 0, marginTop: 0, rotate: 0 });
      api2.start({ y: 0 });
      animationStep.current = "READY";
    }

    if (!canRefresh && animationStep.current === "CAN_REFRESH") {
      api.start({
        opacity: 0,
        marginTop: 0,
        rotate: 0,
        config: { duration: 300 },
      });
      animationStep.current = "READY";
    }
  }, [canRefresh, isRefreshing]);

  // 로딩 화면 표시
  if (isInitialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
        />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "relative",
          alignItems: "center",
          width: "100%",
        }}
      >
        <AnimatedIcons
          name="refresh"
          size={28}
          color="black"
          style={{
            position: "absolute",
            top: -10,
            ...springs,
          }}
        />
      </View>
      <AnimatedView style={{ ...springs2 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View
              style={{ padding: 20, borderBottomWidth: 1, borderColor: "#ccc" }}
            >
              <Text>{item}</Text>
            </View>
          )}
          onScrollBeginDrag={handleScrollStartDrag}
          onScrollEndDrag={handleScrollEndDrag}
          onScroll={handleScroll}
          keyExtractor={(item, index) => index.toString()}
        />
      </AnimatedView>
    </View>
  );
};

export default App;
