import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Filter = (props) => {
  const { data, setData, options, type } = props;

  return (
    <FormControl
      fullWidth
      className="!rounded-xl bg-white !shadow-sm">
      <InputLabel id="demo-simple-select-label">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </InputLabel>
      <Select
        className="!rounded-xl"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={data}
        label={type.charAt(0).toUpperCase() + type.slice(1)}
        onChange={(e) => setData(e.target.value)}>
        {type !== "type" && <MenuItem value="all">All</MenuItem>}
        {options.map((opt, index) => (
          <MenuItem
            key={index}
            value={type === "month" ? opt.value : opt}>
            {type === "month"
              ? opt.name
              : type === "type"
              ? opt.charAt(0).toUpperCase() + opt.slice(1)
              : opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
