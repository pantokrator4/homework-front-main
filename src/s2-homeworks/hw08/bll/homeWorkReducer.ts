import { UserType } from "../HW8";

type ActionType =
  | { type: "sort"; payload: "up" | "down" }
  | { type: "check"; payload: number };

export const homeWorkReducer = (state: UserType[], action: ActionType): any => {
  // need to fix any
  switch (action.type) {
    case "sort": {
			let newState
      if (action.payload ===  "up") {
				const upState = state.sort((a, b) => a.name.localeCompare(b.name))
				newState = upState
			}
			if (action.payload ===  "down") {
				const downState = state.sort((a, b) => b.name.localeCompare(a.name))
				newState = downState
			}

      return newState; // need to fix
    }
    case "check": {
			const newState = state.filter(user => user.age > action.payload)
      return newState; // need to fix
    }
    default:
      return state;
  }
};
