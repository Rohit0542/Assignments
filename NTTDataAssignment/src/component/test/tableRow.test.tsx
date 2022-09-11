import * as React from "react";
import {shallow} from 'enzyme';
import axios from "axios";
import TableRowComponent from "../tableRow";

jest.mock('axios');

const obj ={
  image: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
  name: 'bitcoin',
  current_price: 24000,
  symbol: 'Bi',
  low_24h: 235,
  high_24h: 560,
  id: 'bitcoin'
}

describe("TableRowComponent", () => {
  const wrapper = shallow(<TableRowComponent row={obj} />);
  
  beforeEach(async()=> {
    await jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve(obj));
  })

    it("render coin image", async() => {       
        const arrowClick = wrapper.find("#toggle");
        arrowClick.simulate('click');
        expect(wrapper.find('.imgSize')).toHaveLength(1);
        expect(wrapper.find('.imgSize').prop('src')).toEqual(obj.image);    
    })

    it("make server call", async() => {
        const arrowClick = wrapper.find("#toggle");
        arrowClick.simulate('click');
        expect(axios.get).toHaveBeenCalledWith('https://api.coingecko.com/api/v3/coins/bitcoin');
    })
  
  })
