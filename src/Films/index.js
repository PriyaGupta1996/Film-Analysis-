import React, { Component } from 'react';
import './style.css';

const axios = require('axios');
const moment = require('moment');

const filmsEndpointURL = "https://app.codescreen.com/api/assessments/films";

//Your API token. This is needed to successfully authenticate when calling the films endpoint. 
//This needs to be added to the Authorization header (using the Bearer authentication scheme) in the request you send to the films endpoint.
const apiToken = "8c5996d5-fb89-46c9-8821-7063cfbc18b1"

export default class Films extends Component {

  constructor(props) {
    super(props);
    this.state = { bestRated: "", averageFilm: "", shortestDays: "", longestFilm: "" };
  }

  componentDidMount() {
    const filmData = this.props.filmData;
    console.log("filmData", filmData)
    if (filmData) {
      const bestRated = this.getBestRatedFilm(filmData)
      const longestFilm = this.getLongestFilm(filmData)
      const averageFilm = this.getAverageRating(filmData)
      const shortestDays = this.getShortestNumberOfDaysBetweenFilmReleases(filmData)
      this.setState({ bestRated, longestFilm, averageFilm, shortestDays })
    }
  };

  /**
    * Retrieves the name of the best rated film from the given list of films.
    * If the given list of films is empty, this method should return "N/A".
  */
  getBestRatedFilm(films) {
    if (films.length > 0) {
      const result = films.reduce((accumulator, film) => {
        if (accumulator["rating"] === undefined) {
          accumulator["name"] = film["name"]
          accumulator["rating"] = film["rating"]
        }
        else if (accumulator["rating"] < film["rating"]) {
          accumulator["name"] = film["name"]
          accumulator["rating"] = film["rating"]
        }
        return accumulator
      }, {})
      return result.name
    }
    return "NA"

  }

  /**
    * Retrieves the length of the film which has the longest running time from the given list of films.
    * If the given list of films is empty, this method should return "N/A".
    * 
    * The return value from this function should be in the form "{length} mins"
    * For example, if the duration of the longest film is 120, this function should return "120 mins".
  */
  getLongestFilm(films) {
    if (films.length > 0) {
      const result = films.reduce((accumulator, film) => {
        if (accumulator["length"] === undefined) {
          accumulator["length"] = film["length"]
        }
        else if (accumulator["length"] < film["length"]) {
          accumulator["length"] = film["length"]
        }
        return accumulator
      }, {})
      return result.length + " mins"
    }
    return "NA"
  }

  /**
    * Retrieves the average rating for the films from the given list of films, rounded to 1 decimal place.
    * If the given list of films is empty, this method should return 0.
  */
  getAverageRating(films) {
    if (films.length > 0) {
      const result = films.reduce((accumulator, film) => {
        return accumulator + film["rating"]
      }, 0)
      return (result / films.length).toFixed(1)
    }
    return 0

  }

  /**
    * Retrieves the shortest number of days between any two film releases from the given list of films.
    * 
    * If the given list of films is empty, this method should return "N/A".
    * If the given list contains only one film, this method should return 0.
    * Note that no director released more than one film on any given day.
    * 
    * For example, if the given list is composed of the following 3 entries
    *
    * {
    *    "name": "Batman Begins",
    *    "length": 140,
    *
    *    "rating": 8.2,
    *    "releaseDate": "2006-06-16",
    *    "directorName": "Christopher Nolan"
    * },
    * {
    *    "name": "Interstellar",
    *    "length": 169,
    *    "rating": 8.6,
    *    "releaseDate": "2014-11-07",
    *    "directorName": "Christopher Nolan"
    * },
    * {
    *   "name": "Prestige",
    *   "length": 130,
    *   "rating": 8.5,
    *   "releaseDate": "2006-11-10",
    *   "directorName": "Christopher Nolan"
    * }
    *
    * then this method should return 147, as Prestige was released 147 days after Batman Begins.
  */
  getShortestNumberOfDaysBetweenFilmReleases(films) {
    if (films.length === 0)
      return "NA"
    if (films.length === 1)
      return 0;

    const filmsDate = films.map(film => (
      new Date(film["releaseDate"])
    ))
    filmsDate.sort()
    console.log(filmsDate)
    const diffInMs = filmsDate[filmsDate.length - 1].getTime() - filmsDate[filmsDate.length - 2].getTime();
    return Math.round(diffInMs / (1000 * 60 * 60 * 24));
  }



  render() {
    return (
      <div className="stats-boxes">
        <div id="best-rated-film" className='stats-box'>
          <span className='stats-box-heading'>Best Rated Film</span>
          <span className='stats-box-info'>{this.state.bestRated}</span>
        </div>
        <div id="longest-film" className='stats-box'>
          <span className='stats-box-heading'>Longest Film Duration</span>
          <span className='stats-box-info'>{this.state.longestFilm}</span>
        </div>
        <div id="average-rating" className='stats-box'>
          <span className='stats-box-heading'>Average Rating</span>
          <span className='stats-box-info'>{this.state.averageFilm}</span>
        </div>
        <div id="shortest-days" className='stats-box'>
          <span className='stats-box-heading'>Shortest days between releases</span>
          <span className='stats-box-info'>{this.state.shortestDays}</span>
        </div>
      </div >
    );
  }
}
