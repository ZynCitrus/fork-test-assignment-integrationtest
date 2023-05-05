import { IOmdbResponse } from "./../models/IOmdbResponse";
import { IMovie } from "./../models/Movie";
import axios from "axios";

export const getData = async (searchText: string): Promise<IMovie[]> => {
  return axios
    .get<IOmdbResponse>("http://www.omdbapi.com/?i=tt3896198&apikey=a51568a=" + searchText)
    .then((data) => {
      return data.data.Search;
    })
    .catch(() => {
      return [];
    });
};