import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let movies = [
    {
        id: 1,
        title: "Inception",
        director: "Christopher Nolan",
        year: 2010
    },
    {
        id: 2,
        title: "Interstellar",
        director: "Christopher Nolan",
        year: 2014
    },
    {
        id: 3,
        title: "Avengers: Infinity War",
        director: "Anthony and Joe Russo",
        year: 2018
    },
    {
        id: 4,
        title: "Joker",
        director: "Todd Phillips",
        year: 2019
    },
    {
        id: 5,
        title: "Parasite",
        director: "Bong Joon-ho",
        year: 2019
    }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all
app.get("/movies", (req, res) => {
  res.json(movies);
});

// GET specific
app.get("/movies/:id", (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json(movie);
});

// POST 
app.post("/movies", (req, res) => {
  const newId = Math.floor(Math.random() * 100)+5;
  const movie = {
    id: newId,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year
  };
  movies.push(movie);
  res.status(201).json(movie);
});

//Edit
// app.patch("/movies/:id", (req, res) => {
//   const movie = movies.find((p) => p.id === parseInt(req.params.id));
//   if (!movie) return res.status(404).json({ message: "Movie not found" });

//   if (req.body.title) movie.title = req.body.title;
//   if (req.body.director) movie.director = req.body.director;
//   if (req.body.year) movie.year = req.body.year;

//   res.json(movie);
// });
app.put('/movies/:id', (req, res) => {
  const { id } = req.params;
  
  const movieIndex = movies.findIndex(movie => movie.id === Number(id));
  if (movieIndex !== -1) {
    
    const updatedMovie  = {
      id: Number(id),
      title: req.body.title,
      director: req.body.director,
      year: req.body.year
    };
    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});


// DELETE 
app.delete("/movies/:id", (req, res) => {
  const index = movies.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Movie not found" });

  movies.splice(index, 1);
  res.json({ message: "Movie deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
