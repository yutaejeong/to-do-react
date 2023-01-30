import { DefaultValue, selectorFamily } from "recoil";
import { TodoItemInterface } from "../../types/todoItem";
import { todoListAtom } from "../atoms/todoListAtom";

export const todoListItemSelector = selectorFamily<TodoItemInterface, number>({
	key: "todoListLengthState",
	get: index => ({ get }) => get(todoListAtom)[index],
	set: index => ({ set }, newValue) => {
		if (!(newValue instanceof DefaultValue)) {
			set(todoListAtom, prevList =>
				[...prevList.slice(0, index), newValue, ...prevList.slice(index + 1)]
			);
			return;
		}

		set(todoListAtom, prevList => [...prevList.slice(0, index), ...prevList.slice(index + 1)])
	}
});