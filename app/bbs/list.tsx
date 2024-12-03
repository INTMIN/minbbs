import React, { useState } from "react";
import { Link } from "react-router";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const bbsList = ["first"];

const BBSList = () => {
  const [nowTab, setNowTab] = useState("life");

  const handleChangeTab = (e: React.SyntheticEvent) => {
    const val = (e.target as HTMLInputElement).value;
    setNowTab(val);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        margin: "0 auto",
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={nowTab}
        onChange={handleChangeTab}
        aria-label="basic tabs example"
      >
        <Tab value="life" label="生活碎碎念" />
      </Tabs>
      <List>
        {bbsList.map((ele: string) => (
          <ListItem key={ele}>
            <ListItemButton>
              <Link to={{ pathname: `/bbs/${ele}` }}>
                <ListItemText primary={ele} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BBSList;
