import checkUserBettingOption, { count_d_sum_Occurence } from "./analytics";
import { wrapUpResults, organizeAllRoundsResults, count_sumFeatures_Occurence } from "./analytics";

let data = [
    [ 4, 4, 1, 9 ],
    [ 6, 4, 3, 13 ],
    [ 6, 2, 6, 14 ],
    [ 3, 3, 3, 9 ],
    [ 6, 5, 5, 16 ],
    [ 5, 5, 5, 15 ],
    [ 3, 1, 6, 10 ],
    [ 6, 1, 1, 8 ],
    [ 6, 2, 1, 9 ],
    [ 5, 6, 4, 15 ]
  ]

let dataCharacter = [
    {
      round: 1,
      results: [ 4, 4, 1, 9 ],
      big: false,
      small: true,
      even: false,
      odds: true,
      double: true,
      triple: false,
      bigOdds: false,
      bigEven: false,
      bigDouble: false,
      bigTriple: false,
      smallEven: false,
      smallOdds: true,
      smallDouble: true,
      smallTriple: false
    },
    {
      round: 2,
      results: [ 6, 4, 3, 13 ],
      big: true,
      small: false,
      even: false,
      odds: true,
      double: false,
      triple: false,
      bigOdds: true,
      bigEven: false,
      bigDouble: false,
      bigTriple: false,
      smallEven: false,
      smallOdds: false,
      smallDouble: false,
      smallTriple: false
    },
    {
      round: 3,
      results: [ 6, 2, 6, 14 ],
      big: true,
      small: false,
      even: true,
      odds: false,
      double: true,
      triple: false,
      bigOdds: false,
      bigEven: true,
      bigDouble: true,
      bigTriple: false,
      smallEven: false,
      smallOdds: false,
      smallDouble: false,
      smallTriple: false
    },
    {
      round: 4,
      results: [ 3, 3, 3, 9 ],
      big: false,
      small: true,
      even: false,
      odds: true,
      double: false,
      triple: true,
      bigOdds: false,
      bigEven: false,
      bigDouble: false,
      bigTriple: false,
      smallEven: false,
      smallOdds: true,
      smallDouble: false,
      smallTriple: true
    },
    {
      round: 5,
      results: [ 6, 5, 5, 16 ],
      big: true,
      small: false,
      even: true,
      odds: false,
      double: true,
      triple: false,
      bigOdds: false,
      bigEven: true,
      bigDouble: true,
      bigTriple: false,
      smallEven: false,
      smallOdds: false,
      smallDouble: false,
      smallTriple: false
    },
    {
      round: 6,
      results: [ 5, 5, 5, 15 ],
      big: true,
      small: false,
      even: false,
      odds: true,
      double: false,
      triple: true,
      bigOdds: true,
      bigEven: false,
      bigDouble: false,
      bigTriple: true,
      smallEven: false,
      smallOdds: false,
      smallDouble: false,
      smallTriple: false
    },
    {
      round: 7,
      results: [ 3, 1, 6, 10 ],
      big: true,
      small: false,
      even: true,
      odds: false,
      double: false,
      triple: false,
      bigOdds: false,
      bigEven: true,
      bigDouble: false,
      bigTriple: false,
      smallEven: false,
      smallOdds: false,
      smallDouble: false,
      smallTriple: false
    },
    {
      round: 8,
      results: [ 6, 1, 1, 8 ],
      big: false,
      small: true,
      even: true,
      odds: false,
      double: true,
      triple: false,
      bigOdds: false,
      bigEven: false,
      bigDouble: false,
      bigTriple: false,
      smallEven: true,
      smallOdds: false,
      smallDouble: true,
      smallTriple: false
    },
    {
      round: 9,
      results: [ 6, 2, 1, 9 ],
      big: false,
      small: true,
      even: false,
      odds: true,
      double: false,
      triple: false,
      bigOdds: false,
      bigEven: false,
      bigDouble: false,
      bigTriple: false,
      smallEven: false,
      smallOdds: true,
      smallDouble: false,
      smallTriple: false
    },
    {
      round: 10,
      results: [ 5, 6, 4, 15 ],
      big: true,
      small: false,
      even: false,
      odds: true,
      double: false,
      triple: false,
      bigOdds: true,
      bigEven: false,
      bigDouble: false,
      bigTriple: false,
      smallEven: false,
      smallOdds: false,
      smallDouble: false,
      smallTriple: false
    }
  ]

let sumResults = [
    9, 13, 14, 9, 16,
   15, 10,  8, 9, 15
 ]

let sumFeature =  [
    {
      type: 'sum',
      note: 'max',
      value: '9',
      frequency: 3,
      chance: '30.00%'
    },
    {
      type: 'sum',
      note: '2ndmax',
      value: '15',
      frequency: 2,
      chance: '20.00%'
    },
    {
      type: 'sum',
      note: '3rdmax',
      value: '16',
      frequency: 1,
      chance: '10.00%'
    }
  ]

let outcome =  { userBetWins: true, winningCount: 4 };

test("Characterize Sum Data", () => {
    expect(wrapUpResults(data)).toEqual(dataCharacter);
  });

test("Organize Sum Data", () => {
    expect(organizeAllRoundsResults(3, data)).toEqual(sumResults);
  });

test("Count Sum Data Occurence", () => {
  expect(count_d_sum_Occurence("sum", sumResults)).toEqual(sumFeature);
});

test("Check Option Outcome", () => {
  expect(checkUserBettingOption(40, "double", dataCharacter)).toEqual(outcome);
});
