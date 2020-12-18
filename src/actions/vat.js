import axios from 'axios';
import queryString from 'query-string';

export function feedRates(condition) {
  return function(dispatch) {
    dispatch({
      type: 'VAT/FEED.START',
      payload: condition
    });

    const url = 
      'https://api.vatcomply.com/rates?date=' + 
      `${condition.date.getFullYear()}-${condition.date.getMonth()}-${condition.date.getDate()}`;
    console.log('url: ', url);
    
    return axios.get(url)
      .then((response) => {
        // this is demonstration, so remove some very-big data
        delete response.data.rates['IDR'];
        delete response.data.rates['ISK'];
        delete response.data.rates['KRW'];
        delete response.data.rates['HUF'];

        dispatch({
          type: 'VAT/FEED.DONE',
          payload: response.data.rates
        })
      })
      .catch(() => {
        dispatch({
          type: 'VAT/FEED.ERROR'
        })
      })
  }
}
