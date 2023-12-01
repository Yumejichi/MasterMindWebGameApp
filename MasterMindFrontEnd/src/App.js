import "./App.css";
import LoginForm from "./LoginForm";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import item_1 from "./images/item_1.png";
import item_2 from "./images/item_2.png";
import item_3 from "./images/item_3.png";
import item_4 from "./images/item_4.png";
import item_5 from "./images/item_5.png";
import item_6 from "./images/item_6.png";

// RecordScoreEffect component definition (assuming it's a functional component)
const RecordScoreEffect = (props) => {
  // ... (implementation of RecordScoreEffect)
};

const toGuess = 4;
const maxCols = 5;
const maxRows = 11;

const items = [null, item_1, item_2, item_3, item_4, item_5, item_6];

function App() {
  const [winning, setWinning] = useState(false);
  const [showAnswer, setAnswer] = useState(false);
  const [round, setRound] = useState(1);
  const guessResults = useRef([]);
  const currentRow = [];

  // To initialize the state and manage the selected buttons for each row:
  const selectedButtons = useRef(Array(maxRows).fill([]));
  // Add the handle state here
  const [handle, setHandle] = useState(""); // New state for handle

  // user is the currently logged in user
  const [user, setUser] = useState(null); // Add a state variable for the player's handle
  const [playerHandle, setPlayerHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle player handle input
  const handlePlayerHandleChange = (event) => {
    setPlayerHandle(event.target.value);
    console.log("Player Handle:", event.target.value);
  };

  // Add missing state setters for score and scores
  const [score, setScore] = useState(10);
  const [scores, setScores] = useState([]);
  const [recordedScore, setRecordedScore] = useState(false);
  const [handleModal, setHandleModal] = useState(false);
  const [handleInput, setHandleInput] = useState(""); // New state for handle input

  const handleSetHandle = () => {
    // Set the handle and close the modal
    setPlayerHandle(handleInput);
    setHandleModal(false);
  };

  // this will be called by the LoginForm
  // this will be called by the LoginForm
  function HandleLogin(user) {
    console.log("User logged in:", user);
    // Update the user and playerHandle when the login information is available
    setUser({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
    });
  }

  // judge if the button is selected before
  const isButtonSelectable = (row, col, itemId) => {
    // get the selected button
    const selectedRowButtons = selectedButtons.current[row];
    // if not selected before, you can choose
    return !selectedRowButtons.includes(itemId);
  };

  const shuffle = (array) => {
    return [
      null,
      ...array
        .sort(() => Math.random() - 0.5)
        .filter((value) => {
          return value !== 0;
        })
        .slice(2),
    ];
  };

  const hiddenCombination = useRef([]);
  if (Object.keys(hiddenCombination.current).length === 0)
    hiddenCombination.current = [...shuffle([1, 2, 3, 4, 5, 6])];

  const validateRow = () => {
    console.log("hidden combination:", hiddenCombination);
    console.log("current row, round:", currentRow, round);
    // compare current row with hiddenCombination
    // create a result array of four
    // add one to exact means item plus position is right
    // add one to partial means item is right but not position
    if (!guessResults[round])
      guessResults.current[round] = { exact: 0, partial: 0 };
    currentRow.forEach((guessItem, index) => {
      const indexOfGuessItem = hiddenCombination.current.indexOf(
        parseInt(guessItem),
        1
      );
      {
        /**if both position and color are correct */
      }
      if (indexOfGuessItem !== -1 && indexOfGuessItem === index) {
        guessResults.current[round].exact += 1;
      } else {
        {
          /**
        Check if the item exists in hiddenCombination,
       but only increment partial if it's not in the correct position*/
        }
        if (indexOfGuessItem !== -1 && indexOfGuessItem !== index) {
          guessResults.current[round].partial += 1;
        }
      }
    });
    console.log("guess results:", guessResults);
    if (guessResults.current[round].exact === toGuess) {
      setAnswer(true);
      setWinning(true);
    } else {
      // Decrement the score if the guess is incorrect
      setScore((prevScore) => prevScore - 1);

      if (round < maxRows - 1 && !winning) {
        setRound(round + 1);
      }
    }

    if (score == 0) {
      alert("Game Over! You couldn't guess the combination in 10 rounds.");
    }
  };

  const handleOnDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const targetId = e.target.id;
    const itemNumber = e.dataTransfer.getData("text");
    const itemArr = itemNumber.split("_", 2);
    const itemId = itemArr[1];
    const targetArr = targetId.split("_", 2);

    if (isButtonSelectable(targetArr[0], targetArr[1], itemId)) {
      const colElement = document.getElementById(
        targetArr[0] + "_" + targetArr[1]
      );

      // Set the dropped item's image
      colElement.src = items[itemId];

      currentRow[targetArr[1]] = itemArr[1];

      // update the selected status of button
      selectedButtons.current[targetArr[0]].push(itemId);
    } else {
      // show the error message
      alert("This color is already chosen, choose another one.");
    }
  };

  const resetRowSelection = (row) => {
    // reset the next line
    selectedButtons.current[row] = [];
  };

  const createCol = (row, col) => {
    return (
      <div
        className="col"
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          handleOnDrop(e);
        }}
      >
        <img
          id={`${row}_${col}`}
          className="itemSpot"
          src="images/whiteButton.png"
          alt=""
        />
      </div>
    );
  };

  const createCheckCol = (row) => {
    return (
      <div id={"${row}_${maxCols + 1}"} className="col">
        <img
          className="finger"
          src="/images/finger.png"
          alt="Check/ Validate"
          onClick={(e) => {
            validateRow(row);
            resetRowSelection(row + 1);
          }}
        />
      </div>
    );
  };

  const createRow = (row) => {
    let rowClass = row === 1 ? "row  row-1" : "row";
    if (row > round) {
      rowClass += " rowDark";
    }
    return (
      <div className={rowClass}>
        <div className="col col-1">Guess {row}</div>
        {[...Array(maxCols).keys()]
          .filter(function (value) {
            return value !== 0;
          })
          .map((col) => {
            return createCol(row, col);
          })}
        {createCheckCol(row)}
        {createResultCol(row)}
      </div>
    );
  };

  const createResultCol = (row) => {
    // there is a result
    if (guessResults.current[row]) {
      return (
        //<div id={"${row}_${maxCols +1}"} className="col result-col">
        <div id={`${row}_${maxCols + 1}`} className="col result-col">
          {/* loop while if is true*/}
          {[...Array(guessResults.current[row].exact).keys()].map(
            (item, index) => {
              return (
                <img
                  className="resultCheck"
                  src="images/face_2.png"
                  alt="Result"
                />
              );
            }
          )}
          {[...Array(guessResults.current[row].partial).keys()].map(
            (item, index) => {
              return (
                <img
                  className="resultCheck"
                  src="images/face_1.png"
                  alt="Result"
                />
              );
            }
          )}
          {[
            ...Array(
              4 -
                guessResults.current[row].partial -
                guessResults.current[row].exact
            ).keys(),
          ].map(() => {
            return (
              <img
                className="resultCheck"
                src="images/result_placeholder.png"
                alt="Result"
              />
            );
          })}
        </div>
      );
    } else {
      {
        /**put 4 white spaces */
      }
      return (
        <div id={`${row}_${maxCols + 1}`} className="col result-col">
          <img
            className="resultCheck"
            src="images/result_placeholder.png"
            alt="Result"
          />
          <img
            className="resultCheck"
            src="images/result_placeholder.png"
            alt="Result"
          />
          <img
            className="resultCheck"
            src="images/result_placeholder.png"
            alt="Result"
          />
          <img
            className="resultCheck"
            src="images/result_placeholder.png"
            alt="Result"
          />
        </div>
      );
    }
  };

  const createFrame = () => {
    return (
      <>
        {createCombinationRow()}
        {[...Array(maxRows).keys()]
          .filter(function (value) {
            return value !== 0;
          })
          .sort(function (a, b) {
            return b - a;
          })
          .map((row) => {
            return createRow(row);
          })}
      </>
    );
  };

  const createCombinationRow = () => {
    if (!showAnswer)
      return (
        <div className="row combinationRow">
          ANSWER IS HIDDEN HERE
          <button
            onClick={(e) => {
              setAnswer(true);
            }}
          >
            showAnswer
          </button>
        </div>
      );
    return (
      <div className="row combinationRow">
        <div className="col col-1">CODE</div>
        <div className="col">
          <img
            className="itemSpot"
            src={`./images/item_${hiddenCombination.current[1]}.png`}
            alt=""
          />
        </div>
        <div className="col">
          <img
            className="itemSpot"
            src={`./images/item_${hiddenCombination.current[2]}.png`}
            alt=""
          />
        </div>
        <div className="col">
          <img
            className="itemSpot"
            src={`./images/item_${hiddenCombination.current[3]}.png`}
            alt=""
          />
        </div>
        <div className="col">
          <img
            className="itemSpot"
            src={`./images/item_${hiddenCombination.current[4]}.png`}
            alt=""
          />
        </div>
        <div className="col c55"></div>
        <div className="col c100">
          {showAnswer && !winning && (
            <button
              onClick={(e) => {
                setAnswer(false);
              }}
            >
              Hide Answer
            </button>
          )}
          {winning && (
            <span style={{ fontSize: "18px" }}>
              CONGRATES!
              <br />
              YOU WIN!
            </span>
          )}
        </div>
      </div>
    );
  };

  const createItems = (itemsArray) => {
    return itemsArray.map((aItem) => {
      return (
        <div key={aItem}>
          <img
            onDragStart={(e) => {
              e.dataTransfer.setData("text", `item_${aItem}`);
            }}
            className="itemsPin"
            src={`./images/item_${aItem}.png`}
          ></img>
        </div>
      );
    });
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // function to call API to get all books in DB
  function displayAllScores() {
    axios
      .get("https://mastermindgamerecords.uc.r.appspot.com/findAllScores")
      .then((response) => {
        setScores(response.data); // Assuming response.data contains the scores
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  const handleRecordButtonClick = async () => {
    const postData = {
      //title,
      user: user, // Assuming you have the user information available
      player: playerHandle,
      score: score,
    };
    try {
      const response = await axios.post(
        "https://mastermindgamerecords.uc.r.appspot.com/saveScore",
        postData
      );
      console.log("Response:", response.data);
      //displayAllScores();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div>
      {user ? ( // Check if a user is authenticated
        <div className="App">
          <header className="App-header">
            <div className="background">
              {user && !playerHandle && (
                <div className="modal">
                  <p>Please set your handle:</p>
                  <input
                    type="text"
                    value={handleInput}
                    onChange={(e) => setHandleInput(e.target.value)}
                  />
                  <button onClick={handleSetHandle}>Set Handle</button>
                </div>
              )}

              {/* Include the LoginForm component */}
              <LoginForm LoginEvent={HandleLogin} />
              <div className="left">
                <div className="headline">
                  Mastermind Game {playerHandle && `- Player: ${playerHandle}`}
                </div>
                <div className="itemsColumns">
                  <div>{createItems([1, 2, 3])}</div>
                  <div>{createItems([4, 5, 6])}</div>
                </div>
                Drag and drop color buttons into the white button to guess the
                colors that are rondomly created from the below colors and are
                hidden Each color will be only included one time, you can only
                choose each color for once
                <br />
                Click the check to see how good you guess is
                <br />
                <br />
                <img className="resultCheck" src="images/face_2.png" /> Means
                you picked a right color and placed it in the right position.
                <br />
                <br />
                <img className="resultCheck" src="images/face_1.png" /> Means
                you picked a right color but placed it in the wrong position.
                <br />
                <br />
                <button
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  New Game
                </button>{" "}
              </div>
              <div className="spaceCol"></div>
              <div className="frame">{createFrame()}</div>
              <div className="spaceCol"></div>
              <div className="score">
                {winning && (
                  <div>
                    <span style={{ fontSize: "18px" }}>
                      CONGRATULATIONS! YOU WIN!
                    </span>
                    <br />
                    <span>
                      {playerHandle}'s Score: {score}
                    </span>
                    {/* Display player's handle */}
                    {!recordedScore && (
                      <div>
                        <button onClick={handleRecordButtonClick}>
                          Record Score
                        </button>
                        <button onClick={() => setRecordedScore(true)}>
                          Skip Recording
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {!winning && round === maxRows && (
                  <div>
                    <span style={{ fontSize: "18px" }}>
                      GAME OVER! YOU LOSE!
                    </span>
                    <br />
                    <span>Your Score: {score}</span>
                    {!recordedScore && (
                      <div>
                        <button onClick={handleRecordButtonClick}>
                          Record Score
                        </button>
                        <button onClick={() => setRecordedScore(true)}>
                          Skip Recording
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </header>
        </div>
      ) : (
        <LoginForm LoginEvent={HandleLogin} />
      )}
    </div>
  );
}

export default App;