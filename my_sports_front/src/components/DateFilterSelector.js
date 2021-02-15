import React, { useState } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { filterByDate } from "../actions/filter";
import moment from "moment";

const mapStateToProps = ({ filters }) => ({
  filters,
});

const mapDispatchToProps = (dispatch) => ({
  filterByDate: (payload) => dispatch(filterByDate(payload)),
});

export const DateFilterSelector = ({ filterByDate, filters }) => {
  const [startDate, setStartDate] = useState(new Date());

  const filterDate = (date) => {
    setStartDate(date);
    filterByDate(moment(date).format("YYYY-MM-DD"));
  };

  const removeDateFilter = () => {
    setStartDate(new Date());
    filterByDate("");
  };

  return (
    <div className="accordion-item">
      <h2
        className="accordion-header filter-type-selector"
        id="flush-headingDate"
      >
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseDate"
          aria-expanded="false"
          aria-controls="flush-collapseDate"
        >
          By Date{" "}
          {filters.date && (
            <span className="mx-auto ">
              {moment(filters.date).format("D MMM")}
            </span>
          )}
        </button>
      </h2>
      <div
        id="flush-collapseDate"
        className="accordion-collapse collapse"
        aria-labelledby="flush-headingDate"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <DatePicker
            selected={startDate}
            onChange={(date) => filterDate(date)}
            inline
          />
          <p>
            <button
              className="remove-date-filter-button"
              onClick={removeDateFilter}
            >
              Remove Date Filter
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DateFilterSelector);
