import { Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { todoListLengthSelector } from "../recoil/selectors/todoListLengthSelector";
import { TodoItem } from "./TodoItem";

// 할 일 목록을 보여주는 컴포넌트
export function TodoList() {
  const length = useRecoilValue(todoListLengthSelector);

  return (
    <Stack direction="column" spacing={1}>
      <>
        {new Array(length).fill(0).map((_, i) => (
          <TodoItem key={i} index={i} />
        ))}
      </>
    </Stack>
  );
}
