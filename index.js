// // *  * index.js *  *
// import express from "express";
// import mongoose from "mongoose";
// import blogRoutes from "./routes/blogRoutes.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost:27017/blogdb")
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => console.log("Error connecting to MongoDB", error));

// // Use routes
// app.use("/api/v1", blogRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log(Server is running on port ${PORT});
// });

// // *  * blogRoutes.js  *  *
// import express from "express";
// import blogModel from "../models/blogModel.js";

// const router = express.Router();

// // Create a new blog
// router.post("/create", async (req, res) => {
//   try {
//     const { title, short_des, des, img } = req.body;

//     if (!title || !short_des || !des) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     const newBlog = new blogModel({ title, short_des, des, img });
//     const savedBlog = await newBlog.save();
//     res.status(201).json({
//       message: "Blog created successfully!",
//       data: savedBlog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error creating the blog",
//       error: error.message,
//     });
//   }
// });

// // Read a single blog by ID
// router.get("/blog/:id", async (req, res) => {
//   try {
//     const blog = await blogModel.findById(req.params.id);

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found!" });
//     }

//     res.status(200).json({
//       message: "Blog fetched successfully",
//       data: blog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching the blog",
//       error: error.message,
//     });
//   }
// });

// // Delete a blog by ID
// router.delete("/blog/:id", async (req, res) => {
//   try {
//     const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);

//     if (!deletedBlog) {
//       return res.status(404).json({ message: "Blog not found!" });
//     }

//     res.status(200).json({
//       message: "Blog deleted successfully!",
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error deleting the blog",
//       error: error.message,
//     });
//   }
// });

// // Update a blog by ID
// router.put("/blog/:id", async (req, res) => {
//   try {
//     const { title, short_des, des, img } = req.body;

//     if (!title && !short_des && !des && !img) {
//       return res
//         .status(400)
//         .json({ message: "At least one field is required for update!" });
//     }

//     const updatedBlog = await blogModel.findByIdAndUpdate(
//       req.params.id,
//       { title, short_des, des, img },
//       { new: true }
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ message: "Blog not found!" });
//     }

//     res.status(200).json({
//       message: "Blog updated successfully!",
//       data: updatedBlog,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating the blog",
//       error: error.message,
//     });
//   }
// });

// export default router;

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// Use routes
app.use("/api/", blogRoutes);

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import blogModel from "../models/blogModel.js";

const router = express.Router();

// Create a new blog
router.post("/create", async (req, res) => {
  try {
    const { title, short_des, des, img } = req.body;

    if (!title || !short_des || !des) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newBlog = new blogModel({ title, short_des, des, img });
    const savedBlog = await newBlog.save();
    res.status(201).json({
      message: "Blog created successfully!",
      data: savedBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating the blog",
      error: error.message,
    });
  }
});

// Read a single blog by ID
router.get("/blog/:id", async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    res.status(200).json({
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching the blog",
      error: error.message,
    });
  }
});

// Delete a blog by ID
router.delete("/blog/:id", async (req, res) => {
  try {
    const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    res.status(200).json({
      message: "Blog deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the blog",
      error: error.message,
    });
  }
});

// Update a blog by ID
router.put("/blog/:id", async (req, res) => {
  try {
    const { title, short_des, des, img } = req.body;

    if (!title && !short_des && !des && !img) {
      return res
        .status(400)
        .json({ message: "At least one field is required for update!" });
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(
      req.params.id,
      { title, short_des, des, img },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found!" });
    }

    res.status(200).json({
      message: "Blog updated successfully!",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating the blog",
      error: error.message,
    });
  }
});

export default router;
