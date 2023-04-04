import { useState } from "react";
import axios from "axios";
const filmsEndpointURL = "/api/assessments/films";
import Films from "../Films";

const InputForm = () => {
  const [name, setName] = useState("");
  const [filmData, setFilmData] = useState([]);
  const [show, setShow] = useState(false);

  const OnSubmitHandler = async () => {
    console.log(name);
    const filmData = await axios.get(filmsEndpointURL, {
      params: { directorName: name },
      headers: {
        Authorization: "Bearer 8c5996d5-fb89-46c9-8821-7063cfbc18b1",
      },
    });
    if (name.length > 0) setShow(true);
    else setShow(false);
    setFilmData(filmData.data);
  };

  return (
    <>
      <div id="input-form" className="enter-director-name">
        <input
          type="text"
          placeholder="Enter director name"
          className="director-name-input-box"
          id="input-box"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button
          className="submit-button"
          id="submit-button"
          onClick={OnSubmitHandler}
        >
          <span className="submit-button-text">Submit</span>
        </button>
      </div>
      {show && <Films filmData={filmData} />}
    </>
  );
};

export default InputForm;
