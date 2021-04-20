import React, { useState, useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { Context } from "../context/handleResultContext";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "../App.css";

// import './App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    width: 300,
    height: 180,
    minWidth: 275,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    marginLeft: "200px",
    marginTop: "20px",
  },
  margin: {
    height: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export function ScreenOne() {
  const classes = useStyles();
  const [roundNum, setRoundNum] = React.useState("");
  const [bettingOption, setbettingOption] = React.useState("");
  const [isRoundNumSelected, setIsRoundNumSelected] = React.useState(false);
  const [isOptionSelected, setIsOptionSelected] = React.useState(false);
  const { state, saveResult } = useContext(Context);
  const [roundNumValue, setRoundNumValue] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [rows, setRows] = useState<any>([]);
  const [showRules, setShowRules] = useState(false);

  const handleChange = (event: any) => {
    if (event.target.id === "grouped-native-select") {
      console.log("testing 1");
      setRoundNum(event.target.value);
      setRoundNumValue(event.target.value);
      setIsRoundNumSelected(!isRoundNumSelected);
    } else {
      console.log("testing 2");
      setbettingOption(event.target.value);
      setOptionValue(event.target.value);
      setIsOptionSelected(!isOptionSelected);
    }
    setShowTable(false);
    event.target.value = "";
  };

  console.log("testing roundNum, ", roundNum);
  console.log("testing bettingOption, ", bettingOption);

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:8080/bettingInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roundNum,
        bettingOption,
      }),
    });
    if (res.status === 200) {
      console.log("congrats, fetching succeeds");
      setbettingOption("");
      setRoundNum("");
      setOptionValue("");
      setRoundNumValue("");
      setIsRoundNumSelected(!isRoundNumSelected);
      setIsOptionSelected(!isOptionSelected);
      const result = await res.json();
      console.log("testing result, ", result);
      saveResult(result);
      setShowTable(true);
    }
  };

  useEffect(() => {
    function createData(
      userRoundNum: any,
      userOption: any,
      userBetResult: any,
      userRoundVictoryNum: any
    ) {
      return {
        userRoundNum,
        userOption,
        userBetResult,
        userRoundVictoryNum,
      };
    }
    console.log("testing state.roundNum, ", state.roundNum);
    console.log("testing state.userWin.userBetWins", state.userWin.userBetWins);
    if (state.userWin.userBetWins) {
      var userWin = "";
      console.log("testing winning or not");
      userWin = "Win";
    } else {
      userWin = "Lose";
    }
    setRows([
      createData(
        state.roundNum,
        state.bettingOption,
        userWin,
        state.userWin.winningCount
      ),
    ]);
  }, [state]);

  console.log("testing state from context, ", state);
  console.log("testing rows", rows);

  const [stateSwitch, setStateSwitch] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChangeSwitch = (event: any) => {
    setStateSwitch({ ...state, [event.target.name]: event.target.checked });
    setShowRules(!showRules);
  };

  function createDataRules(rule: any, details: any) {
    return { rule, details };
  }

  const rowsRules = [
    createDataRules(
      "Game Steps",
      "Select (i) Game Round Number; (ii) Game Options"
    ),
    createDataRules(
      "Game Options",
      "Simple and Complex Options include: (i) Big; (ii) Small; (iii) Even; (iv) Odds; (v) Double; (vi) Triple; (vii) Big / Small X either one of the (i)-(vi)"
    ),
    createDataRules(
      "Game Marks",
      "'Beginner' and 'Advanced' level Cases: (i) For less than 500 Rounds, you need to get at least 3 wins; (ii) For 500 rounds or more, you need to get at least 25 wins."
    ),
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <h1 className="header">Configure Your Gaming</h1>
        <div className="headerSwitch">
          <FormControlLabel
            control={
              <Switch
                checked={stateSwitch.checkedB}
                onChange={handleChangeSwitch}
                name="checkedB"
                color="primary"
              />
            }
            label="Check Out Rules"
          />
        </div>
        {showRules ? (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Rules</StyledTableCell>
                  <StyledTableCell align="center">Details</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsRules.map((row: any, i: any) => (
                  <StyledTableRow key={row.i}>
                    <StyledTableCell align="center" component="th" scope="row">
                      {row.rule}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.details}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
        <div className="optionSelectBox">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-native-select">
              Round Number
            </InputLabel>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              onChange={handleChange}
              displayEmpty={isRoundNumSelected}
            >
              <option aria-label="None" value={roundNumValue}>
                {roundNum}
              </option>
              <optgroup label="Beginner Level">
                <option value={1}>1</option>
                <option value={10}>10</option>
              </optgroup>
              <optgroup label="Advanced Level">
                <option value={500}>500</option>
                <option value={1000}>1000</option>
              </optgroup>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">Betting Option</InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              onChange={handleChange}
              displayEmpty={isRoundNumSelected}
            >
              <MenuItem value={optionValue} aria-label="None" />
              <ListSubheader>Simple Option</ListSubheader>
              <MenuItem value={"big"}>Big</MenuItem>
              <MenuItem value={"small"}>Small</MenuItem>
              <MenuItem value={"odds"}>Odds</MenuItem>
              <MenuItem value={"even"}>Even</MenuItem>
              <MenuItem value={"double"}>Double</MenuItem>
              <MenuItem value={"triple"}>Triple</MenuItem>
              <ListSubheader>Complex Option</ListSubheader>
              <MenuItem value={"bigOdds"}>Big Odd</MenuItem>
              <MenuItem value={"bigEven"}>Big Even</MenuItem>
              <MenuItem value={"bigDouble"}>Big Double</MenuItem>
              <MenuItem value={"bigTriple"}>Big Triple</MenuItem>
              <MenuItem value={"smallOdds"}>Small Odds</MenuItem>
              <MenuItem value={"smallEven"}>Small Even</MenuItem>
              <MenuItem value={"smallDouble"}>Small Double</MenuItem>
              <MenuItem value={"smallTriple"}>Small Triple</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="playButton">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
            style={{ width: "420px", marginTop: "30px" }}
          >
            Play
          </Button>
        </div>

        {showTable ? (
          <Paper elevation={4} className="table">
            <h3 className="header">Results</h3>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Selected Round Number</TableCell>
                    <TableCell align="center">
                      Selected Betting Option
                    </TableCell>
                    <TableCell align="center">Betting Outcome</TableCell>
                    <TableCell align="center">Winning Round Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row: any, i: any) => (
                    <TableRow key={i}>
                      <TableCell align="center" component="th" scope="row">
                        {row.userRoundNum}
                      </TableCell>
                      <TableCell align="center">{row.userOption}</TableCell>
                      <TableCell align="center">{row.userBetResult}</TableCell>
                      <TableCell align="center">
                        {row.userRoundVictoryNum}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        ) : null}
      </Container>
    </React.Fragment>
  );
}

export default ScreenOne;
