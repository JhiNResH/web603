const express = require("express");
const router = express.Router();
const bookController = require("./book.controller");

router.post("/api/book", bookController.createBook);
router.get("/api/book/:id", bookController.getBook);
router.get("/api/books", bookController.books);
router.put("/api/book", bookController.updateBook);
router.delete("/api/book/:id", bookController.deleteBook);

module.exports = router;
