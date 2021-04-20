import express from "express";
import checkUserBettingOption, {
  roundResults,
  wrapUpResults,
  organizeAllRoundsResults,
  count_d_sum_Occurence,
  count_sumFeatures_Occurence,
} from "./analytics";
import { getDb } from "./main";

export const routes = express.Router();

// R1 - Handling Gaming Options

routes.post("/bettingInfo", async (req, res) => {
  // console.log('testing req.body at backend, ', req.body)
  const roundNum: any = req.body.roundNum;
  const option = req.body.bettingOption;
  // Step 1: Generate Dice Results
  let diceRawResults: any[] = roundResults(roundNum);
  // Step 2: Characterize Dice Results
  let diceProcessedResults: any[] = wrapUpResults(diceRawResults);
  // Step 3: Check User Betting Option
  let userWinningChance: {
    userBetWins: boolean;
    winningCount: number;
  } = checkUserBettingOption(roundNum, option, diceProcessedResults);
  console.log("testing userWinningChance at main.ts, ", userWinningChance);
  console.log("testing at backend, ", roundNum, option);
  // Step 4: Save results into mongoDB for culmulative analytics
  const user = await getDb()
    .collection("sicbo")
    .update(
      { id: 1 },
      {
        $push: {
          results: {
            $each: diceRawResults,
          },
        },
      }
    );

  res.json({
    success: true,
    roundNum,
    option,
    diceRawResults,
    diceProcessedResults,
    userWinningChance,
  });
});

// R2 - Analyzing Gaming Data Stored in MongoDB

routes.get("/mongoDBsicBoData", async (req, res) => {
  try {
    const result = await getDb().collection("sicbo").find({}).toArray();

    // Step 1: Get sicbo results from MongoDB
    let allSicBoResults = result[0].results;

    // Step 2: Characterize the results
    let allProcessedSicBoResults = wrapUpResults(allSicBoResults);

    // Step 3: Analytics

    // Step 3.1: Organize Results (3 dices and Sum)
    let dice1Results = organizeAllRoundsResults(0, allSicBoResults);
    let dice2Results = organizeAllRoundsResults(1, allSicBoResults);
    let dice3Results = organizeAllRoundsResults(2, allSicBoResults);
    let sumResults = organizeAllRoundsResults(3, allSicBoResults);

    // Step 3.2: Calculate Occurence for 3.1.
    let analyticD1 = count_d_sum_Occurence("Dice One", dice1Results);
    let analyticD2 = count_d_sum_Occurence("Dice Two", dice2Results);
    let analyticD3 = count_d_sum_Occurence("Dice Three", dice3Results);
    let analyticSum = count_d_sum_Occurence("SicBo Sum", sumResults);

    // Step 3.3: Calculate Occurence for Betting Options
    let analyticResultFeature = count_sumFeatures_Occurence(
      allProcessedSicBoResults
    );

    // Step 3.4. Repackage Data for Pie Charts
    function reorganizeDataForChart(data: any) {
      let newData: any[] = [];
      let eachNumData: any[] = [];
      if (Array.isArray(data)) {
        console.log("testing in reorganize function");
        data.map((e: any, i: any) => {
          eachNumData = [];
          eachNumData.push(e["value"]);
          eachNumData.push(e["frequency"]);
          if (eachNumData.length === 2) {
            newData.push(eachNumData);
          }
        });
      }
      return newData;
    }

    let d1DataForChart = reorganizeDataForChart(analyticD1);
    let d2DataForChart = reorganizeDataForChart(analyticD2);
    let d3DataForChart = reorganizeDataForChart(analyticD3);
    let sumDataForChart = reorganizeDataForChart(analyticSum);
    let optionDataForChart = reorganizeDataForChart(analyticResultFeature);
    console.log("testing newData in BE1, ", d1DataForChart);
    console.log("testing newData in BE2, ", d2DataForChart);
    console.log("testing newData in BE3, ", d3DataForChart);
    console.log("testing newData in BE-Sum, ", sumDataForChart);
    console.log("testing newData in BE-Option, ", optionDataForChart);

    res.json({
      success: true,
      dataLength: allSicBoResults.length,
      d1DataForChart,
      d2DataForChart,
      d3DataForChart,
      sumDataForChart,
      optionDataForChart,
    });
  } catch (err) {
    console.log(err);
  }
});
