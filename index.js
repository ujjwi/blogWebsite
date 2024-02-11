import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let items=[];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    formD : items
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.post("/add", (req, res) => {
  res.render("post.ejs");
});

app.post("/posted", (req, res) => {
  const data = {
    author: req.body.author,
    title: req.body.title,
    blog: req.body.blog
  };
  items.push(data);
  const postId = items.length - 1; // Index of the newly added post
  res.redirect(`/blog/${postId}`);
});

app.get("/blog/:id", (req, res) => {
  const id=req.params.id;
  res.render("blog.ejs",{
    t:id,
    formD : items,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});