import { atom } from "recoil";
import { TodoItemInterface } from "../../types/todoItem";

// 할 일 목록을 모두 담고 있는 아톰
export const todoListAtom = atom<TodoItemInterface[]>({
  key: "todoListState",
  default: [],
});
