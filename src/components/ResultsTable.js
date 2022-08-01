import React, { useState } from "react";
import "./ResultsTable.css";
import data from "./results.json";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 2,
};

function ResultsTable() {
  // const [age, setAge] = React.useState("all");

  const [tableData, setTableData] = useState(data);
  const [showStatistics, setShowStatistics] = useState(false);
  const [color, setColor] = useState("");
  const [nameUpperCase, setNameUpperCase] = useState("");
  const [selectedResult, setSelectedResult] = useState({});

  let ten = [];
  let nine = [];
  let eight = [];
  let seven = [];
  let six = [];
  let five = [];
  let four = [];
  let three = [];
  let two = [];
  let one = [];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleShowStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  const handlefinalGrade = (value) => {
    if (value === "alphabetical") {
      function SortArray(x, y) {
        return x.name.localeCompare(y.name);
      }
      let alphabetiaclOrder = tableData.sort(SortArray);
      setTableData([...alphabetiaclOrder]);
    }

    if (value === "acs") {
      let ascendingData = tableData.sort(
        (a, b) =>
          a.examGrade * 0.6 +
          a.ratingGrade * 0.4 -
          (b.examGrade * 0.6 + b.ratingGrade * 0.4)
      );
      setTableData([...ascendingData]);
    }

    if (value === "desc") {
      let descendingData = tableData.sort(
        (a, b) =>
          a.examGrade * 0.6 +
          a.ratingGrade * 0.4 -
          (b.examGrade * 0.6 + b.ratingGrade * 0.4)
      );
      let descending = descendingData.reverse();
      setTableData([...descending]);
    }
  };

  const handleStatus = (value) => {
    if (value === "pass") {
      let passCandidates = data.filter((data) => {
        let passed = data.examGrade * 0.6 + data.ratingGrade * 0.4;
        return passed > 4;
      });
      setTableData([...passCandidates]);
    }

    if (value === "fail") {
      let failCandidates = data.filter((data) => {
        let failed = data.examGrade * 0.6 + data.ratingGrade * 0.4;
        return failed <= 4;
      });
      setTableData([...failCandidates]);
    }

    if (value === "all") {
      setTableData([...data]);
    }
  };

  const handleFilterByName = (value) => {
    let filteredData = data.filter((eachData) => {
      return value === eachData.name;
    });
    if (filteredData.length >= 1) {
      setTableData([...filteredData]);
    } else {
      setTableData(data);
    }
  };
  // let maximum = [];

  const maximumGrade = data.map((eachData) => {
    return eachData.examGrade * 0.6 + eachData.ratingGrade * 0.4;
    // return Math.max(...maximum);
  });

  let maximum = Math.max(...maximumGrade);
  let minimum = Math.min(...maximumGrade);



  for (let i = 0; i <= maximumGrade.length; i++) {
    if (maximumGrade[i] === 10) {
      ten.push(maximumGrade[i]);
    } else if (maximumGrade[i] === 9) {
      nine.push(maximumGrade[i]);
    } else if (maximumGrade[i] === 8) {
      eight.push(maximumGrade[i]);
    } else if (maximumGrade[i] === 7) {
      seven.push(maximumGrade[i]);
    } else if (maximumGrade[i] === 6) {
      six.push(maximumGrade[i]);
    } else if (maximumGrade[i] === 5) {
      five.push(maximumGrade[i]);
    } else if (maximumGrade[i] === 4) {
      four.push(maximumGrade[i]);
    } else if (maximumGrade[i] === 3) {
      three.push(maximumGrade[i]);
    } else if (maximumGrade[i] === 2) {
      two.push(maximumGrade[i]);
    } else if (maximumGrade[i] === 1) {
      one.push(maximumGrade[i]);
    }
  }



  const handleColumnColor = (value) => {
    setColor(value.id);
    setNameUpperCase(value.name);
  };

  return (
    <div>
      <div className="container mt-4 mb-4 m-0 g-0">
        <div className="row" >
          <div className="col-md-2 col-sm-6 col-xs-12 mt-2 mb-2" >
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handleStatus(e.target.value)}
              style={{ width: "100%" }}
            >
              <option value="all">all</option>
              <option value="pass">passed</option>
              <option value="fail">fail</option>
            </select>
          </div>
          <div className="col-md-2 col-sm-6 col-xs-12 mt-2 mb-2">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handlefinalGrade(e.target.value)}
              style={{ width: "100%" }}
            >
              <option hidden>Select by</option>
              <option value="alphabetical">alphabetical</option>
              <option value="acs">asc by final grade</option>
              <option value="desc">desc by final grade</option>
            </select>
          </div>
          <div className="col-md-2 col-sm-6 col-xs-12 mt-2 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="filter by name"
              onChange={(e) => handleFilterByName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive w-100">
        <table className="table table-bordered">
          <thead className="thead-dark" style={{ background: "#f3f4f5" }}>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Ticket Number</th>
              <th scope="col">Rating Grade</th>
              <th scope="col">Exam Grade</th>
              <th scope="col">Final Grade</th>
              <th scope="col">Status</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((eachData, index) => (
              <tr
                key={eachData.id}
                onClick={() => handleColumnColor(eachData)}
                style={{ background: color === eachData.id ? "#f4f4f5" : "" }}
              >
                <td>{index++}</td>
                <td>
                  {nameUpperCase === eachData.name
                    ? eachData.name.toUpperCase()
                    : eachData.name}
                </td>
                <td>{eachData.ticketsNumber}</td>
                <td>{eachData.ratingGrade}</td>
                <td>{eachData.examGrade}</td>
                <td>{eachData.examGrade * 0.6 + eachData.ratingGrade * 0.4}</td>
                <td>
                  {eachData.examGrade * 0.6 + eachData.ratingGrade * 0.4 > 4
                    ? `passed`
                    : `failed`}
                </td>
                <td>
                  <Button
                    onClick={() => {
                      handleOpen();
                      setSelectedResult(eachData);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {showStatistics === true ? (
          <button
            onClick={() => handleShowStatistics()}
            className="btn btn-primary"
          >
            Hide Statistics
          </button>
        ) : (
          <button
            onClick={() => handleShowStatistics()}
            className="btn btn-primary"
          >
            Show Statistics
          </button>
        )}
      </div>

      <div>
        {showStatistics === true && (
          <div className="mt-3 mb-3">
            <Typography>
              The Number Of Students that received a certain grade:- "10":-
              {ten.length},"9":-{nine.length},"8":-{eight.length},"7":-
              {seven.length},"6":-{six.length},"5":-{five.length},"4":-
              {four.length},"3":-{three.length},"2":-{two.length},"1":-
              {one.length}
            </Typography>
            <Typography>The Minimum Grade:-{minimum}</Typography>
            <Typography>The Maximum Grade:-{maximum}</Typography>
            <Typography>The Total Number of Students:-{data.length}</Typography>
          </div>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedResult.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            TicketsTopic :-{selectedResult.ticketsTopic}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            ExamsGrade:- {selectedResult.examGrade}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            RatingGrade {selectedResult.ratingGrade}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            Comments:- {selectedResult.comments}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ResultsTable;
