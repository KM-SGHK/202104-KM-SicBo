import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { findByLabelText } from "@testing-library/dom";
import ScreenOne from "./component/ScreenOne";
import ScreenTwo from "./component/ScreenTwo";
import ScreenThree from "./component/ScreenThree";
import { Provider } from "./context/handleResultContext";
import background from "./asset/dice2.png";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "person-info": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Provider>
      <div className={classes.root}>
        <AppBar position="static" className="tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Onboard" {...a11yProps(0)} />
            <Tab label="Getting Started" {...a11yProps(1)} />
            <Tab label="Getting Results" {...a11yProps(2)} />
            <Tab label="Getting Analytics" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              height: "670px",
              width: "100%",
              marginTop: "15px",
              marginLeft: "-260px", 
              marginBottom: "-5px"
            }}
          >
          </div>
          <div><p className="header">Start Your Journey</p></div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ScreenOne />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ScreenTwo />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ScreenThree />
        </TabPanel>
      </div>
    </Provider>
  );
}

export default App;
