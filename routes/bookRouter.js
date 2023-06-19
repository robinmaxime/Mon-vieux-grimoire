const express = require("express");
const bookController = require("../controllers/bookController");
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/bestrating", bookController.getBestRating);
router.get("/:id", bookController.getOneBook);
router.post("/", auth, multer, bookController.createNewBook);
router.post("/:id/rating", auth, bookController.setBookRating);
router.put("/:id", auth, multer, bookController.modifyBook);
router.delete("/:id", auth, bookController.deleteBook);

module.exports = router;
