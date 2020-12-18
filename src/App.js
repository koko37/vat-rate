import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Badge, Button } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import Chart from './components/Chart';
import { feedRates } from './actions/vat';

const mapStateToProps = (state) => ({
  date: state.vat.date,
  baseCurrency: state.vat.base,
  rates: state.vat.rates,
  pending: state.vat.pending,
  hasError: state.vat.hasError
});

const mapDispatchToProps = (dispatch) => ({
  feedRatesData: (condition) => feedRates(condition)(dispatch),
});

function App({date, baseCurrency, rates, pending, hasError, feedRatesData}) {
  const [graphType, setGraphType] = useState('bar');
  const [detailsText, setDetailsText] = useState('');
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    feedRatesData({date})
  }, [feedRatesData]);

  useEffect(() => {
    if(!activeId) return;

    const key = Object.keys(rates)[activeId];
    setDetailsText(`${key}:  ${rates[key]}`);
  }, [rates, activeId]);

  const onClickPrevDate = () => {
    const prevDate = date;
    prevDate.setDate(date.getDate() - 1);
    feedRatesData({date: prevDate});
  }

  const onClickNextDate = () => {
    const nextDate = date;
    nextDate.setDate(date.getDate() + 1);
    if(nextDate > (new Date())) return;
    feedRatesData({date: nextDate});
  }

  const onClickToggleType = () => {
    if(graphType === 'bar') {
      setGraphType('line')
    } else {
      setGraphType('bar')
    }
  }

  const onClickedHandler = (id) => {
    setDetailsText('Clicked: ' + Object.keys(rates)[id]);
  }

  return (
    <div className="graph-result bg-secondary vh-100 w-100 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center mt-2">
        {
          pending && (
          <Loader
            type="Oval"
            color="#FFF"
            height={24}
            width={24}
            className="spinner mr-4 mb-2"
          />
          )
        }
        <h3 className="display-6 text-white">VAT Currency Exchange Rate ({baseCurrency})</h3>
        { hasError && (<Badge variant="danger" className="ml-4" pill>Error!</Badge>) }
      </div>
      <div className="graph-wrapper w-75 mt-4">
        <Chart 
          type={graphType}
          data={rates} 
          clickedHandler={onClickedHandler}
          hoverHandler={setActiveId}
        />
      </div>
      <div className="graph-nav d-flex justify-content-between w-75 mt-3 pt-3 border-top">
        <div>
          <Button variant="primary" onClick={() => onClickToggleType()}>Type: &nbsp;{ graphType.toUpperCase() }</Button>
        </div>
        <div>
          <Button variant="info" className="btn-default rounded-circle" onClick={() => onClickPrevDate()}>&lt;</Button>
          <span className="text-white mx-4">
            {date.toDateString()}
          </span>
          <Button variant="info" className="btn-default rounded-circle" onClick={() => onClickNextDate()}>&gt;</Button>
        </div>
        <div className="text-white">
          {detailsText}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
