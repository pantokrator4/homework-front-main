const initState: State = {
  themeId: 1,
};

export const themeReducer = (state = initState, action: Action): State => {
  // fix any
  switch (action.type) {
    case "SET_THEME_ID":
			return {...state, themeId: action.id}

    default:
      return state;
  }
};

export const changeThemeId = (id: number): Action => ({
  type: "SET_THEME_ID",
  id,
}); // fix any

export type Action = {
  type: string;
  id: number;
};

export type State = {
	themeId: number
}
