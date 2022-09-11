import * as React from "react";
import {shallow} from 'enzyme';
import axios from "axios";
import TableComponent from "../table";
import { Table, TableCell } from "@mui/material";

jest.mock('axios');

const obj ={
  page: 0,
  rowsPerPage: 10
}

describe("TableComponent", () => {
  const wrapper = shallow(<TableComponent />);
  
  beforeEach(async()=> {
    await jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(obj));
    wrapper.update();
  })

    it("make server call", () => {
      expect(wrapper.find(Table)).toBeDefined();
      expect(wrapper.find(TableCell)).toBeDefined();
    })
  
  })
