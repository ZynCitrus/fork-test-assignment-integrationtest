import { getData } from "../ts/services/movieservice";
import axios from "axios";

jest.mock("axios");

describe("getData function", () => {
  it("filmarray", async () => {
    const mockResponse = {
      data: {
        Search: [
          { Title: "Movie 1", Year: "2000", imdbID: "1", Type: "movie", Poster: "N/A" },
          { Title: "Movie 2", Year: "2001", imdbID: "2", Type: "movie", Poster: "N/A" },
          { Title: "Movie 3", Year: "2002", imdbID: "3", Type: "movie", Poster: "N/A" },
        ],
      },
    };
    const searchText = "test";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce(mockResponse);

    const result = await getData(searchText);

    expect(result).toEqual(mockResponse.data.Search);
  });

  it("tom array om error", async () => {
    const searchText = "test";

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error());

    const result = await getData(searchText);

    expect(result).toEqual([]);
  });
});
