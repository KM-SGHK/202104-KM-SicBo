 <FormControl className={classes.formControl} onChange={handleChange}>
          <InputLabel htmlFor="grouped-native-select1">Round Number</InputLabel>
          <Select native defaultValue="" id="grouped-native-select1">
            <option aria-label="None" value="" />
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
        <FormControl className={classes.formControl} onChange={handleChange}>
          <InputLabel htmlFor="grouped-native-select2">
            Betting Option
          </InputLabel>
          <Select defaultValue="" id="grouped-native-select2">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <ListSubheader>Simple Option</ListSubheader>
            <MenuItem value={"big"}>Big</MenuItem>
            <MenuItem value={"small"}>Small</MenuItem>
            <ListSubheader>Complex Option</ListSubheader>
            <MenuItem value={"bigEven"}>Big Even</MenuItem>
            <MenuItem value={"bigOdd"}>Big Odd</MenuItem>
          </Select>
        </FormControl>