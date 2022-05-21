interface IAction {
    type: EMainReducer;
    payload?: any;
}

export enum EMainReducer {
    RECOVER_MAIN,
}

const mainReducer = (state: any, action: IAction) => {
  switch (action.type) {
    case EMainReducer.RECOVER_MAIN: {
      const main = window.localStorage.getItem('savedMain');

      if (main) {
        const parseMain = JSON.parse(main);

        const newMain = {
          ...parseMain,
        };

        return {
          main: newMain,
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
