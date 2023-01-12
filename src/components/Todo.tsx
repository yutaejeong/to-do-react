import { useState } from "react";
import { atom, DefaultValue, selector, selectorFamily, useRecoilState, useResetRecoilState,useRecoilValue, useSetRecoilState } from "recoil";
import { Stack, TextField, Button, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTimer } from "../hooks/useTimer";

// 할 일 목록 하나의 인터페이스
type TodoItemInterface = {
	id: number;
	isCompleted: boolean;
	doing: string;
};

// 할 일 목록을 모두 담고 있는 아톰
const todoListState = atom<TodoItemInterface[]>({
	key: "todoListState",
	default: [],
});

const todoListItemState = selectorFamily<TodoItemInterface, number>({
	key: "todoListLengthState",
	get: index => ({get}) => get(todoListState)[index],
	set: index => ({set}, newValue) => {
		if(!(newValue instanceof DefaultValue)) {
			set(todoListState, prevList => 
				[...prevList.slice(0, index), newValue, ...prevList.slice(index + 1)]
				);
				return;
		}
		
		set(todoListState, prevList => [...prevList.slice(0, index), ...prevList.slice(index + 1)])
		}
});

const todoListLengthState = selector<number>({
	key: 'todoListLength',
	get: ({get}) => get(todoListState).length});

// 할 일 목록에 대한 컴포넌트
export function Todo() {
	return (
		<Stack direction='column' spacing={2} style={{width: "fit-content"}}>
			<TodoCreator />
			<TodoList />
		</Stack>
	);
}

// 할 일 목록을 만드는 영역에 대한 컴포넌트
function TodoCreator() {
	const [inputValue, setInputValue] = useState<string>("");
	const setTodoList = useSetRecoilState(todoListState);

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
				isCompleted: false,
				doing: inputValue,
			},
		]);
		setInputValue(""); // 목록에 추가 후 입력란 초기화
	};

	return (
		<Stack direction='row' spacing={2}>
			<TextField
				label='What will you do?'
				value={inputValue}
				onChange={onChange}
			/>
			<Button variant='contained' onClick={addTodo}>
				ADD
			</Button>
		</Stack>
	);
}

// 개별 할 일 요소를 구분짓기 위한 번호
let id = 0;
function getId() {
	return id++;
}

// 할 일 목록을 보여주는 컴포넌트
function TodoList() {
	const length = useRecoilValue(todoListLengthState);

	return (
		<Stack direction='column' spacing={1}>
			<>
				{new Array(length).fill(0).map((_, i) => (
					<TodoItem key={i} index={i}/>	
				))}
			</>
		</Stack>
	);
}

function TodoItem(props: {index:number}) {
	const [todo, setTodo] = useRecoilState(todoListItemState(props.index));
	const resetTodo = useResetRecoilState(todoListItemState(props.index));
	const {onGoing, time, startTimer, stopTimer} = useTimer();

	return (
		<Stack direction='row' spacing={1}>
			<TextField variant='outlined' value={todo.doing} disabled={todo.isCompleted} onChange={({target: {value}}) => {
				setTodo(currVal => ({...currVal, doing: value}))
			}}/>
			<Checkbox checked={todo.isCompleted} onChange={({target: {checked}}) => {
				setTodo(currVal => ({...currVal, isCompleted: checked}));
				if(onGoing) {
					stopTimer();
				}
			}} />
			<IconButton
				aria-label='delete'
				onClick={resetTodo}
			>
				<DeleteIcon />
			</IconButton>
			<p>{`${Math.floor(time / 60)}:${time % 60}`}</p>
			<Button variant={onGoing  ? "outlined" : "contained"} size="small" onClick={
				onGoing ? stopTimer : startTimer
			} disabled={todo.isCompleted}>
				{todo.isCompleted ? "완료" : time ? (onGoing ? '일시정지' : '계속도전') : '도전'}
				</Button>
		</Stack>
	)
}