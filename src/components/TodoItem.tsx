import { Button, Checkbox, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useTimer } from "../hooks/useTimer";
import { todoListItemSelector } from "../recoil/selectors/todoListItemSelector";
import DeleteIcon from "@mui/icons-material/Delete";

export function TodoItem(props: { index: number }) {
	const [todo, setTodo] = useRecoilState(todoListItemSelector(props.index));
	const resetTodo = useResetRecoilState(todoListItemSelector(props.index));
	const { onGoing, time, startTimer, stopTimer } = useTimer();

	return (
		<Stack direction='row' spacing={1}>
			<Checkbox checked={todo.status === "completed"} onChange={({ target: { checked } }) => {
				setTodo(currVal => ({ ...currVal, status: checked ? "completed" : "todo" }));
				if (onGoing) {
					stopTimer();
				}
			}} />
			<TextField variant='outlined' value={todo.doing} disabled={todo.status === "completed"} onChange={({ target: { value } }) => {
				setTodo(currVal => ({ ...currVal, doing: value }))
			}} />
			<IconButton
				aria-label='delete'
				onClick={resetTodo}>
				<DeleteIcon />
			</IconButton>
			<Typography variant="body1">시간</Typography>
			<Button
				variant={onGoing ? "outlined" : "contained"}
				size="small"
				onClick={onGoing ? stopTimer : startTimer}
				disabled={todo.status === "completed"}
				sx={{ width: 80 }}>
				{todo.status === "completed" ? "완료" : todo.status === "paused" ? '계속도전' : onGoing ? '일시정지' : '도전'}
			</Button>
		</Stack>
	)
}