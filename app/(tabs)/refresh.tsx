import useScrollRefresh from "@/hooks/useScrollRefresh";
import React, { useState, useEffect } from "react";
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
        setData(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
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
  const { isRefreshing, handleScroll, handleScrollEndDrag, canRefresh } =
    useScrollRefresh(fetchData);

  const AnimatedIcons = animated(Icons);
  const [springs, api] = useSpring(() => ({
    marginTop: 0,
    opacity: 0,
    rotate: 0,
  }));
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (canRefresh && !animating && !isRefreshing) {
      api.start({
        opacity: 1,
        marginTop: 40,
      });
    }

    if (isRefreshing) {
      api.start({
        from: { rotate: 0 },
        to: { rotate: 360 },
        config: { duration: 800 },
        loop: true, // 명시적으로 무한 반복
      });
      setAnimating(true);
    } else {
      setAnimating(false);
    }
  }, [canRefresh, isRefreshing]);

  useEffect(() => {
    if (animating === false) {
      api.stop(); // 명시적으로 애니메이션 중지
      setAnimating(false);
      api.start({ opacity: 0, marginTop: 0, rotate: 0 });
      setAnimating(false);
    }
  }, [animating]);

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
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View
            style={{ padding: 20, borderBottomWidth: 1, borderColor: "#ccc" }}
          >
            <Text>{item}</Text>
          </View>
        )}
        onScrollEndDrag={handleScrollEndDrag}
        onScroll={handleScroll}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              width: "100%",
              top: -30,
            }}
          >
            <AnimatedIcons
              name="refresh"
              size={34}
              color="black"
              style={{
                ...springs,
              }}
            />
          </View>
        }
      />
    </View>
  );
};

export default App;
