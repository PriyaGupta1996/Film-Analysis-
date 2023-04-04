import { useState } from "react";
const axios = require("axios");

const filmsEndpointURL = "https://app.codescreen.com/api/assessments/films";

const InputForm = () => {
  const [name, setName] = useState("");

  const OnSubmitHandler = async (name) => {
    const filmData = await axios.get(filmsEndpointURL, {
      params: { directorName: name },
    });
    console.dir(filmData, { depth: null });
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
          onClick={() => OnSubmitHandler(name)}
        >
          <span className="submit-button-text">Submit</span>
        </button>
      </div>
    </>
  );
};

export default InputForm;
