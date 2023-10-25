import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to render the main page
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/movies`);
    console.log(response);
    res.render("index.ejs", { movies: response.data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies" });
  }
});

// Route to render the edit page
app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "New Movie Title", submit: "Create Movie Title" });
});

app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/movies/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs", {
      heading: "Edit Title",
      submit: "Update Title",
      post: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie" });
  }
});

// Create a new post
app.post("/api/movies", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/movies`, req.body);
    console.log(response.data);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error creating movie" });
  }
});

// Edit
app.post("/api/movies/:id", async (req, res) => {
  console.log("called");
  try {
    const response = await axios.put(
      `${API_URL}/movies/${req.params.id}`,
      req.body
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error updating movie" });
  }
});

// Delete a post
app.get("/api/movies/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/movies/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie" });
  }
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
