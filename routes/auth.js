const express = require("express");

const authController =
    require("../controllers/auth.controller");

const router = express.Router();
// SIGNUP
router.post("/signup", authController.signup);

// LOGIN
router.post("/login", authController.login);
// CHANGE PASSWORD
const authenticateToken = require("../middleware/auth");
router.put("/change-password", authenticateToken, authController.changePassword);

// DELETE ACCOUNT
router.delete("/delete-account", authenticateToken, authController.deleteAccount);
// UPDATE PROFILE
router.put("/update-profile", authenticateToken, authController.updateProfile);

module.exports = router;