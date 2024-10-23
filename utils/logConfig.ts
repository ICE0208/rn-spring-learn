import { LogBox } from "react-native";

const originalWarn = console.warn;
const IGNORED_WRAN_LOGS = ["resizeMode", "shadow", "props.pointerEvents"];

// 특정 경고 메시지 무시
export function ignoreLogs() {
  LogBox.ignoreLogs(IGNORED_WRAN_LOGS);

  console.warn = (message, ...args) => {
    if (
      typeof message === "string" &&
      IGNORED_WRAN_LOGS.some((ignored) => message.includes(ignored))
    ) {
      return; // 무시할 메시지일 경우 로그 출력 안함
    }
    originalWarn(message, ...args); // 그 외의 경고는 정상적으로 출력
  };
}
