import _ from "underscore";

// A. RESULTS (1 - 2)

// 1. Generation of datasets

// 1.1. Round Results
export function roundResults(roundNumber: number) {
  let eachRound = [];
  let allRounds = [];
  for (let i = 0; i < roundNumber; i++) {
    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;
    let num3 = Math.floor(Math.random() * 6) + 1;
    let sum = num1 + num2 + num3;
    eachRound.push(num1);
    eachRound.push(num2);
    eachRound.push(num3);
    eachRound.push(sum);
    if (eachRound.length === 4) {
      allRounds.push(eachRound);
      eachRound = [];
    }
  }
  return allRounds;
}

let sample = roundResults(5);
console.log(sample);

// 1.2. Characterizing Results from 1.1.

export function wrapUpResults(data: any[]) {
  let big = false;
  let small = false;
  let even = false;
  let odds = false;
  let double = false;
  let triple = false;
  let bigEven = false;
  let bigOdds = false;
  let bigDouble = false;
  let bigTriple = false;
  let smallEven = false;
  let smallOdds = false;
  let smallDouble = false;
  let smallTriple = false;
  let allResultsSummary = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i][3] >= 10 && data[i][3] <= 18) {
      // console.log("testing 1, ", data[i][3]);
      big = true;
    }

    if (data[i][3] >= 1 && data[i][3] <= 9) {
      // console.log("testing 2, ", data[i][3]);
      small = true;
    }

    if (data[i][3] % 2 === 0) {
      // console.log("testing 3, ", data[i][3]);
      even = true;
    }

    if (data[i][3] % 2 !== 0) {
      // console.log("testing 4, ", data[i][3]);
      odds = true;
    }

    if (_.uniq(data[i]).length !== data[i].length) {
      let duplicateMap = {};
      for (let item of data[i]) {
        if (duplicateMap[item] == null) {
          duplicateMap[item] = 0;
        }
        duplicateMap[item] += 1;
      }
      // console.log("testing 5, ", duplicateMap);
      for (let num in duplicateMap) {
        if (duplicateMap[num] === 2) {
          double = true;
        }

        if (duplicateMap[num] === 3) {
          triple = true;
        }
      }
    }

    if (big && even) {
      bigEven = true;
    } else if (big && odds) {
      bigOdds = true;
    }

    if (big && double) {
      // console.log("testing 6");
      bigDouble = true;
    } else if (big && triple) {
      // console.log("testing 7");
      bigTriple = true;
    }

    if (small && odds) {
      // console.log("testing 8");
      smallOdds = true;
    } else if (small && even) {
      // console.log("testing 9");
      smallEven = true;
    }

    if (small && double) {
      smallDouble = true;
    } else if (small && triple) {
      smallTriple = true;
    }

    allResultsSummary.push({
      round: i + 1,
      results: data[i],
      big,
      small,
      even,
      odds,
      double,
      triple,
      bigOdds,
      bigEven,
      bigDouble,
      bigTriple,
      smallEven,
      smallOdds,
      smallDouble,
      smallTriple,
    });

    big = false;
    small = false;
    even = false;
    odds = false;
    double = false;
    triple = false;
    bigEven = false;
    bigOdds = false;
    bigDouble = false;
    bigTriple = false;
    smallEven = false;
    smallOdds = false;
    smallDouble = false;
    smallTriple = false;
  }

  return allResultsSummary;
}

// 2. Checking User Option

export default function checkUserBettingOption(
  roundNum: any,
  bettingOption: any,
  result: any
) {
  result.map((e: any) =>
    Object.keys(e).forEach((key) => {
      if (!e[key]) delete e[key];
    })
  );

  let notAllwed = ["results", "round"];
  let editedResult = result.map((e: any) =>
    Object.keys(e)
      .filter((key) => !notAllwed.includes(key))
      .reduce((obj, key) => {
        obj[key] = e[key];
        return obj;
      }, {})
  );

  let option = bettingOption;
  let winningCount = 0;

  editedResult.map((e: any) => {
    Object.keys(e).map((key) => {
      if (key == option && e[key]) {
        winningCount += 1;
      }
    });
  });

  console.log("testing in user check 1, result", result);
  console.log("testing in user check 2, editedResults", editedResult);
  console.log("testing in user check 3, winningCount", winningCount);

  var userBetWins = false;
  if (roundNum < 500 && winningCount >= 3) {
    userBetWins = true;
  } else if (roundNum >= 500 && winningCount >= 25) {
    userBetWins = true;
  }

  return { userBetWins, winningCount };
}

let sampleResults = wrapUpResults(sample);
console.log("testing 2", sampleResults);

// console.table(allRounds);
// console.log("testing function, ", roundUpResults(allRounds));

// B. ANALYTICS (3 - 4)

// 3. Organizing each d and sum data from each dataset

export function organizeAllRoundsResults(index: number, data: any[]) {
  return data.map((e: any) => e[index]);
}

let num1Results = organizeAllRoundsResults(0, sample);
let num2Results = organizeAllRoundsResults(1, sample);
let num3Results = organizeAllRoundsResults(2, sample);
let sumResults = organizeAllRoundsResults(3, sample);

console.log("testing 3", num1Results);
// console.log("testing 4", num2Results);
// console.log("testing 5", num3Results);
console.log("testing 6", sumResults);

// 4. Processing Each Round Data

// 4.1. Finding top 3 occurence of each dice and sum data from each dataset
export function count_d_sum_Occurence(type: string, data: any[]) {
  let totalFrequency = data.length;

  let occurence = {};
  for (let item of data) {
    if (occurence[item] == null) {
      occurence[item] = 0;
    }
    occurence[item] += 1;
  }

  let top3Occurence = [];
  let occurenceData: any = Object.entries(occurence).sort((a: any, b: any) => {
    if (a[1] < b[1]) return -1;
    return 0;
  });

  top3Occurence.push({
    type,
    note: "max",
    value: occurenceData[occurenceData.length - 1][0],
    frequency: occurenceData[occurenceData.length - 1][1],
    chance:
      (
        (occurenceData[occurenceData.length - 1][1] / totalFrequency) *
        100
      ).toFixed(2) + "%",
  });

  top3Occurence.push({
    type,
    note: "2ndmax",
    value: occurenceData[occurenceData.length - 2][0],
    frequency: occurenceData[occurenceData.length - 2][1],
    chance:
      (
        (occurenceData[occurenceData.length - 2][1] / totalFrequency) *
        100
      ).toFixed(2) + "%",
  });

  top3Occurence.push({
    type,
    note: "3rdmax",
    value: occurenceData[occurenceData.length - 3][0],
    frequency: occurenceData[occurenceData.length - 3][1],
    chance:
      (
        (occurenceData[occurenceData.length - 3][1] / totalFrequency) *
        100
      ).toFixed(2) + "%",
  });

  console.log("testing occurence", occurence);
  return top3Occurence;
}

// 4.2. Finding Top 3 Gaming Options Occurence

export function count_sumFeatures_Occurence(result: any[]) {
  // console.log(result);

  let top3Occurence = [];

  result.map((e: any) =>
    Object.keys(e).forEach((key) => {
      if (!e[key]) delete e[key];
    })
  );

  console.log('testing 0421-1, sumFeatures result, ', result)

  let notAllwed = ["results", "round"];
  let reshapedResult = result.map((e: any) =>
    Object.keys(e)
      .filter((key) => !notAllwed.includes(key))
      .reduce((obj, key) => {
        obj[key] = e[key];
        return obj;
      }, {})
  );

  console.log("testing 0421-2, reshapedResults, ", reshapedResult);

  let mappingResultFeatures = {}; // attention
  for (let item of reshapedResult) {
    for (let key of Object.keys(item)) {
      if (mappingResultFeatures[key] == null) {
        mappingResultFeatures[key] = 0;
      }
      mappingResultFeatures[key] += 1;
    }
  }

  console.log("testing mappingResultFeatures, ", mappingResultFeatures);

  let totalResultFeaturesNum = Object.entries(mappingResultFeatures)
    .map((e: any) => e[1])
    .reduce((acc, cur) => {
      return acc + cur;
    }, 0);

  console.log("testing result features sum, ", totalResultFeaturesNum);

  let sortedMappingResultFeatures: any = Object.entries(
    mappingResultFeatures
  ).sort((a: any, b: any) => {
    if (a[1] < b[1]) return -1;
    return 0;
  });

  console.log(
    "testing sortedMappingResultFeatures, ",
    sortedMappingResultFeatures
  );

  top3Occurence.push({
    type: "Betting Option",
    note: "max",
    value:
      sortedMappingResultFeatures[sortedMappingResultFeatures.length - 1][0],
    frequency:
      sortedMappingResultFeatures[sortedMappingResultFeatures.length - 1][1],
    chance:
      (
        (sortedMappingResultFeatures[
          sortedMappingResultFeatures.length - 1
        ][1] /
          totalResultFeaturesNum) *
        100
      ).toFixed(2) + "%",
  });

  top3Occurence.push({
    type: "Betting Option",
    note: "2ndmax",
    value:
      sortedMappingResultFeatures[sortedMappingResultFeatures.length - 2][0],
    frequency:
      sortedMappingResultFeatures[sortedMappingResultFeatures.length - 2][1],
    chance:
      (
        (sortedMappingResultFeatures[
          sortedMappingResultFeatures.length - 2
        ][1] /
          totalResultFeaturesNum) *
        100
      ).toFixed(2) + "%",
  });

  top3Occurence.push({
    type: "Betting Option",
    note: "3rdmax",
    value:
      sortedMappingResultFeatures[sortedMappingResultFeatures.length - 3][0],
    frequency:
      sortedMappingResultFeatures[sortedMappingResultFeatures.length - 3][1],
    chance:
      (
        (sortedMappingResultFeatures[
          sortedMappingResultFeatures.length - 3
        ][1] /
          totalResultFeaturesNum) *
        100
      ).toFixed(2) + "%",
  });
  return top3Occurence.sort((a: any, b: any) => {
    if (a.frequency > b.frequency) {
      return 1;
    }
    return 0;
  });
}

let analyticD1 = count_d_sum_Occurence("d1", num1Results);
let analyticD2 = count_d_sum_Occurence("d2", num2Results);
let analyticD3 = count_d_sum_Occurence("d3", num3Results);
let analyticSum = count_d_sum_Occurence("sum", sumResults);
let analyticResultFeature = count_sumFeatures_Occurence(sampleResults);

// console.log("testing 7", analyticD1);
// console.log("testing 8", analyticD2);
// console.log("testing 9", analyticD3);
// console.log("testing 10", analyticSum);
console.log("testing 11", analyticResultFeature);
let userResult = checkUserBettingOption(40, "double", sampleResults);
console.log("testing 2.5., ", userResult);
