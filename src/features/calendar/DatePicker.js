import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { setDate } from "./selectedDateSlice";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const MyDatePicker = ({ from }) => {
  const params = useParams();
  const url = params["*"];
  const myRouter = url.split("/");
  const navigate = useNavigate();
  const selectedDate = useSelector((state) => state.selectedDate.date);
  const dispatch = useDispatch();
  const days = ["Pn", "Wt", "Sr", "Cz", "Pt", "So", "Ni"];
  const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => "dd/MM/yyyy",
    },
  };

  const { garageId, day, month, year } = useParams();
  let theDate;
  if (selectedDate) {
    const [d, m, y] = selectedDate.split("/");
    theDate = new Date(`${y}-${m}-${d}`);
  } else {
    theDate = new Date(`${year}-${month}-${day}`);
  }
  const [startDate, setStartDate] = useState(theDate);
  const handleClick = (date) => {
    const dateFormated = format(new Date(date), "dd/MM/yyyy");
    if (from == "main") {
      const [newDay, newMonth, newYear] = dateFormated?.split("/");
      console.log(myRouter[1]);
      if (myRouter[2] === "calendar") {
        console.log(`myRouter[1]1: ${myRouter[1]}`);
        navigate(`/dash/${garageId}/calendar/${newDay}/${newMonth}/${newYear}`);
      } else {
        console.log(`myRouter[1]2: ${myRouter[1]}`);
        navigate(`/${garageId}/appointments/${newDay}/${newMonth}/${newYear}`);
      }
    }
    setStartDate(date);
    dispatch(setDate(dateFormated));
  };
  return (
    <DatePicker
      className="datePicker"
      locale={locale}
      dateFormat="dd/MM/yyyy"
      selected={startDate}
      onChange={(date) => handleClick(date)}
    />
  );
};

export default MyDatePicker;
