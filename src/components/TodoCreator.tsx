import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { todoListAtom } from "../recoil/atoms/todoListAtom";

// 개별 할 일 요소를 구분짓기 위한 번호
let id = 0;
function getId() {
  return id++;
}

// 할 일 목록을 만드는 영역에 대한 컴포넌트
export function TodoCreator() {
  const [inputValue, setInputValue] = useState<string>("");
  const setTodoList = useSetRecoilState(todoListAtom);

  // 입력란의 텍스트는 변경되는 매 순간 저장합니다.
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // 할 일 추가 버튼을 눌렀을 때 호출되는 함수
  const addTodo = () => {
    setTodoList((prevList) => [
      ...prevList,
      {
        id: getId(),
        status: "todo",
        doing: inputValue,
      },
    ]);
    setInputValue(""); // 목록에 추가 후 입력란 초기화
  };

  return (
    <Stack direction="row" justifyContent="space-between" spacing={1}>
      <TextField
        label="What will you do?"
        value={inputValue}
        onChange={onChange}
        onKeyDown={(e) => {
          e.code === "Enter" && addTodo();
        }}
        sx={{ width: 330 }}
      />
      <Button variant="contained" onClick={addTodo} sx={{ width: 80 }}>
        ADD
      </Button>
    </Stack>
  );
}
