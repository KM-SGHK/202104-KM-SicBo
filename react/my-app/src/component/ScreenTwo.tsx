import React, { useContext } from "react";
import { Context } from "../context/handleResultContext";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";

export function ScreenTwo() {
  let rows: GridRowsProp = [];
  let eachRoundKey: any = [];

  const { state } = useContext(Context);
  console.log("testing context state in screen 2, ", state);
  // eslint-disable-next-line array-callback-return
  state.diceRawResults.map((e: any, i: any) => {
    let winningInEachRound = "Lost";
    rows.push({
      id: i + 1,
      dice1Results: e[0],
      dice2Results: e[1],
      dice3Results: e[2],
      roundResults: e[3],
    });
    eachRoundKey = Object.keys(state.diceProcessedResults[i]);
    console.log("testing eachRoundKey, ", eachRoundKey);
    // eslint-disable-next-line array-callback-return
    eachRoundKey.map((key: any, index: any) => {
      // eslint-disable-next-line eqeqeq
      console.log(`testing in map round ${i}, `);
      console.log("testing key in map", key);
      console.log("testing state.bettingOption, ", state.bettingOption);
      console.log("testing e[key] in map, ", e[key]);
      if (key == state.bettingOption) {
        winningInEachRound = "Won";
      }
      rows[i]["roundWinning"] = winningInEachRound;
    });
  });

  console.log("testing rows in screen 2 ", rows);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Round Number", width: 230 },
    { field: "dice1Results", headerName: "Dice 1 Results", width: 230 },
    { field: "dice2Results", headerName: "Dice 2 Results", width: 230 },
    {
      field: "dice3Results",
      headerName: "Dice 3 Results",
      width: 230,
    },
    {
      field: "roundResults",
      headerName: "Round Results",
      width: 230,
    },
    {
      field: "roundWinning",
      headerName: "Bet Results",
      width: 230,
    },
  ];

  return (
    <div>
      <h1 className="header">Study Your Gaming Results</h1>

      <p className="subtitle">
        Option: {state.bettingOption}  |  Status:{" "}
        {state.userWin.userBetWins ? "Won" : "Lost"}  |  Round:{" "}
        {state.roundNum}
      </p>

      <div style={{ height: 450, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={50} />
      </div>
    </div>
  );
}

export default ScreenTwo;
