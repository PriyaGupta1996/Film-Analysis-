import { useState } from "react";
import axios from "axios";
const filmsEndpointURL = "/api/assessments/films";

const InputForm = () => {
  const [name, setName] = useState("");

  const OnSubmitHandler = async (name) => {
    const filmData = await axios.get(filmsEndpointURL, {
      params: { directorName: name },
      headers: {
        Authorization: "Bearer 8c5996d5-fb89-46c9-8821-7063cfbc18b1",
      },
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
