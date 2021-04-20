import createDataContext from "./createDataContext";

const resultReducer = (state, action) => {
  switch (action.type) {
    case "saveResult":
      console.log("testing from reducer");
      return {
        ...state,
        roundNum: action.payload.roundNum,
        bettingOption: action.payload.bettingOption,
        diceRawResults: action.payload.rawResults,
        diceProcessedResults: action.payload.processedResults,
        userWin: action.payload.userWin
      };
    default:
      return state;
  }
};

const saveResult = (dispatch) => async (result) => {
  try {
    console.log("testing from context, ", result);
    dispatch({
      type: "saveResult",
      payload: {
        roundNum: result.roundNum,
        bettingOption: result.option,
        rawResults: result.diceRawResults,
        processedResults: result.diceProcessedResults,
        userWin: result.userWinningChance,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const { Provider, Context } = createDataContext(
  resultReducer,
  { saveResult },
  { roundNum: "", bettingOption: "", diceRawResults: [], userWin: false, diceProcessedResults: []} // original state
);
