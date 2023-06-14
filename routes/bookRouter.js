const express = require("express");
const bookController = require("../controllers/bookController");
const multer = require("../middleware/multer-config");

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/bestrating", bookController.getBestRating);
router.get("/:id", bookController.getOneBook);
router.post("/", multer, bookController.createNewBook);
router.post("/:id/rating", bookController.setBookRating);
router.put("/:id", bookController.modifyBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
