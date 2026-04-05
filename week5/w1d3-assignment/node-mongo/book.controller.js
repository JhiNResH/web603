const Book = require("./book.model");

exports.createBook = (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
  });
  book.save((err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({ message: "Book created successfully!" });
  });
};

exports.getBook = (req, res) => {
  Book.findById(req.params.id, "-__v", (err, book) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(book);
  });
};

exports.books = async (req, res) => {
  const books = await Book.find();
  res.status(200).send(books);
};

exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.body._id);
  if (!book) return res.status(404).send({ message: "Book not found." });
  book.title = req.body.title;
  book.author = req.body.author;
  await book.save();
  res.status(200).send({ message: "Book updated successfully!" });
};

exports.deleteBook = async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) return res.status(404).send({ message: "Book not found." });
  res.status(200).send({ message: "Book deleted successfully!" });
};
