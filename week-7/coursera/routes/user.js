const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", async function(req, res) {
    res.json({
        message: "User created successfully",
    })
})

userRouter.post("signin", async function(res, req) {
    res.json({
        message: "User logged in successfully",
    })
})

userRouter.get("/purchase", async function(req, res) {
    res.json({
        message: "Purchase successful",
    })
})

module.exports = {
    userRouter: userRouter
}