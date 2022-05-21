const defaultMain: Object = {}

export const defaultState = {
  main: {
    ...defaultMain,
    },
};

export const combineReducers = (reducers: any) => (state: Object, action: any) => Object.keys(reducers).reduce((acc: any, prop: any) => ({
  ...acc,
  ...reducers[prop]({ [prop]: acc[prop] }, action),
}), state);
