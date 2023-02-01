// 할 일 목록 하나의 인터페이스
export interface TodoItemInterface {
  id: number;
  status: "todo" | "onGoing" | "paused" | "completed" | "deleted";
  doing: string;
}
