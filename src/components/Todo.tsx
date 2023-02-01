import { Stack } from "@mui/material";
import { TodoCreator } from "./TodoCreator";
import { TodoList } from "./TodoList";

// 할 일 목록에 대한 컴포넌트
export function Todo() {
  return (
    <Stack direction="row" justifyContent="center" style={{ width: "100%" }}>
      <Stack direction="column" spacing={2}>
        <TodoCreator />
        <TodoList />
      </Stack>
    </Stack>
  );
}
