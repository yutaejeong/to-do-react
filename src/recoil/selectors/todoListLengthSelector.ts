import { selector } from "recoil";
import { todoListAtom } from "../atoms/todoListAtom";

export const todoListLengthSelector = selector<number>({
	key: 'todoListLength',
	get: ({ get }) => get(todoListAtom).length
});