const initialState = {
  date: new Date(),
  base: 'USD',
  rates: {},
  hasError: false,
  pending: false,
}

export default function vatReducer(state=initialState, action) {
  switch(action.type) {
    case 'VAT/FEED.START':
      return {
        ...state,
        date: action.payload.date || state.date,
        base: action.payload.base || state.base,
        hasError: false,
        pending: true
      };

    case 'VAT/FEED.ERROR':
      return {
        ...state,
        hasError: true,
        pending: false,
      };

    case 'VAT/FEED.DONE':
      return {
        ...state,
        hasError: false,
        pending: false,
        rates: action.payload
      }

    default:
      return state;
  }
}
