import { movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/Movie";

describe("Sortera", () => {
  it("sortera stigande", () => {
    // Arrange
    const movies: IMovie[] = [
      { Title: "Frozen", Year: "2013", imdbID: "tt2294629", Type: "movie", Poster: "N/A" },
      { Title: "Moana", Year: "2016", imdbID: "tt3521164", Type: "movie", Poster: "N/A" },
      { Title: "Tangled", Year: "2010", imdbID: "tt0398286", Type: "movie", Poster: "N/A" },
    ];

    // Act
    const sortedMovies = movieSort(movies);

    // Assert
    expect(sortedMovies[0].Title).toBe("Frozen");
    expect(sortedMovies[1].Title).toBe("Moana");
    expect(sortedMovies[2].Title).toBe("Tangled");
  });

  it("sortera fallande", () => {
    // Arrange
    const movies: IMovie[] = [
      { Title: "Frozen", Year: "2013", imdbID: "tt2294629", Type: "movie", Poster: "N/A" },
      { Title: "Moana", Year: "2016", imdbID: "tt3521164", Type: "movie", Poster: "N/A" },
      { Title: "Tangled", Year: "2010", imdbID: "tt0398286", Type: "movie", Poster: "N/A" },
    ];

    // Act
    const sortedMovies = movieSort(movies, false);

    // Assert
    expect(sortedMovies[0].Title).toBe("Tangled");
    expect(sortedMovies[1].Title).toBe("Moana");
    expect(sortedMovies[2].Title).toBe("Frozen");
  });
});
