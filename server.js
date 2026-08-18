import express from "express";
import path from "path";
import fs from "fs";
import session from "express-session";

const app = express();
const port = 3000;

// ==========================
// USERS FILE
// ==========================

const usersFile = "./users.json";

let users = JSON.parse(
    fs.readFileSync(usersFile, "utf-8")
);

// ==========================
// MIDDLEWARE
// ==========================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    session({
        secret: "my-secret-key",
        resave: false,
        saveUninitialized: false
    })
);

// ==========================
// LOGIN PAGE
// ==========================

app.get("/", (req, res) => {
    res.sendFile(path.resolve("./views/login.html"));
});

// ==========================
// REGISTER PAGE
// ==========================

app.get("/register", (req, res) => {
    res.sendFile(path.resolve("./views/register.html"));
});

// ==========================
// DASHBOARD PAGE
// ==========================

app.get("/dashboard", (req, res) => {

    // Check if user is logged in
    if (!req.session.user) {
        return res.redirect("/");
    }

    res.sendFile(path.resolve("./views/dashboard.html"));
});

// ==========================
// REGISTER API
// ==========================

app.post("/api/register", (req, res) => {

    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        return res.json({
            success: false,
            message: "Email already registered"
        });
    }

    // Create new user
    const newUser = {
        username: username,
        email: email,
        password: password
    };

    users.push(newUser);

    // Save user to users.json
    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
    );

    res.json({
        success: true,
        message: "Registration successful"
    });
});

// ==========================
// LOGIN API
// ==========================

app.post("/api/login", (req, res) => {

    const { email, password } = req.body;

    // Find user
    const user = users.find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.json({
            success: false,
            message: "Invalid email or password"
        });
    }

    // Create login session
    req.session.user = {
        username: user.username,
        email: user.email
    };

    res.json({
        success: true,
        message: "Login successful"
    });
});

// ==========================
// GET CURRENT USER
// ==========================

app.get("/api/me", (req, res) => {

    if (!req.session.user) {
        return res.json({
            success: false,
            message: "Not logged in"
        });
    }

    res.json({
        success: true,
        user: req.session.user
    });

});

// ==========================
// LOGOUT API
// ==========================

app.get("/logout", (req, res) => {

    req.session.destroy(() => {
        res.redirect("/");
    });

});

// ==========================
// START SERVER
// ==========================

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});