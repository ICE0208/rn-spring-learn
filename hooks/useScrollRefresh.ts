import { useState, useRef } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";

const refreshPoint = -40;

const useScrollRefresh = (fetchData: () => Promise<void>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const scrollY = useRef(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.current = event.nativeEvent.contentOffset.y;
    setCanRefresh(scrollY.current <= refreshPoint);
  };

  const handleScrollEndDrag = async () => {
    if (scrollY.current <= refreshPoint && !isRefreshing) {
      setIsRefreshing(true);
      await fetchData(); // 데이터 로드가 끝날 때까지 기다림
      setIsRefreshing(false); // 새로고침 상태 해제
    }
  };

  return { isRefreshing, handleScroll, handleScrollEndDrag, canRefresh };
};

export default useScrollRefresh;
