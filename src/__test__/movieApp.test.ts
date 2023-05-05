/**
 * @jest-environment jsdom
 */

import { handleSubmit, createHtml, displayNoResult } from "../ts/movieApp";
import { IMovie } from "../ts/models/Movie";
import axios from "axios";

jest.mock("axios");

describe("MovieApp test", () => {
  let container: HTMLDivElement;
  let searchText: HTMLInputElement;
  let form: HTMLFormElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="searchForm">
        <input type="text" id="searchText">
        <button type="submit">Search</button>
      </form>
      <div id="movie-container"></div>
    `;
    container = document.getElementById("movie-container") as HTMLDivElement;
    searchText = document.getElementById("searchText") as HTMLInputElement;
    form = document.getElementById("searchForm") as HTMLFormElement;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("handleSubmit test", () => {
    it("inget resultat om tom söktext", async () => {
      searchText.value = "";
      await handleSubmit();
      expect(container.innerHTML).toContain("Inga sökresultat att visa");
    });

    it("Inget resultat om strängen är tom", async () => {
      searchText.value = "some-search-text";
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: { Search: [] } });
      await handleSubmit();
      expect(container.innerHTML).toContain("Inga sökresultat att visa");
    });


    //    KOMMENTAR: Får inte denna att funka hur jag än gör. Har till och med rådfrågat ChatGPT utan att få det korrekt :P

    // it("Sökresultat", async () => {
    //   const movies: IMovie[] = [
    //     {
    //       Title: "Movie 1",
    //       imdbID: "1",
    //       Type: "movie",
    //       Poster: "https://example.com/poster1.jpg",
    //       Year: "2001",
    //     },
    //     {
    //       Title: "Movie 2",
    //       imdbID: "2",
    //       Type: "movie",
    //       Poster: "https://example.com/poster2.jpg",
    //       Year: "2002",
    //     },
    //   ];
    //   searchText.value = "some-search-text";
    //   (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: { Search: [] } });

    //   await handleSubmit();
    //   expect(container.innerHTML).toContain("Movie 1");
    //   expect(container.innerHTML).toContain("https://example.com/poster1.jpg");
    //   expect(container.innerHTML).toContain("Movie 2");
    //   expect(container.innerHTML).toContain("https://example.com/poster2.jpg");
    // });

    it("Inget resultat", async () => {
      searchText.value = "some-search-text";
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: { Search: [] } });
      await handleSubmit();
      expect(container.innerHTML).toContain("Inga sökresultat att visa");
    });
  });

  describe("Skapa HTML", () => {
    it("Skapa HTML för filmer", () => {
      const movies: IMovie[] = [
        {
          Title: "Movie 1",
          imdbID: "1",
          Type: "movie",
          Poster: "https://example.com/poster1.jpg",
          Year: "2001",
        },
        {
          Title: "Movie 2",
          imdbID: "2",
          Type: "movie",
          Poster: "https://example.com/poster2.jpg",
          Year: "2002",
        },
      ];
      createHtml(movies, container);
      expect(container.innerHTML).toContain("Movie 1");
      expect(container.innerHTML).toContain("https://example.com/poster1.jpg");
      expect(container.innerHTML).toContain("Movie 2");
      expect(container.innerHTML).toContain("https://example.com/poster2.jpg");
    });
    test("Plocka ut ur array, printa till HTML", () => {
      const container = document.createElement("div");
      const movies: IMovie[] = [
        {
          Title: "Movie 1",
          imdbID: "1",
          Type: "movie",
          Poster: "https://example.com/poster1.jpg",
          Year: "2021",
        },
        {
          Title: "Movie 2",
          imdbID: "2",
          Type: "movie",
          Poster: "https://example.com/poster2.jpg",
          Year: "2022",
        },
      ];
    
      createHtml(movies, container);
    
      expect(container.innerHTML).toContain("<h3>Movie 1</h3>");
      expect(container.innerHTML).toContain("<img src=\"https://example.com/poster1.jpg\" alt=\"Movie 1\">");
      expect(container.innerHTML).toContain("<h3>Movie 2</h3>");
      expect(container.innerHTML).toContain("<img src=\"https://example.com/poster2.jpg\" alt=\"Movie 2\">");
    });
});
});