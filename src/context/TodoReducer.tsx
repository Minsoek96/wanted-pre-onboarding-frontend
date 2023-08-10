interface TodoType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

type Action =
  | { type: 'INIT'; data: TodoType[] }
  | { type: 'CREATE'; data: TodoType }
  | { type: 'DELETE'; id: number }
  | { type: 'EDIT'; data: TodoType };

export const reducer = (state: TodoType[], action: Action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'DELETE': {
      newState = state.filter((it) => it.id !== action.id);
      break;
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it,
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};
