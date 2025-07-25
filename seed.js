const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Menu = require("./models/Menu"); // Adjust the path to your Menu model

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/kawe-restaurant", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Path to the `menus` folder
const menusFolder = path.join(__dirname, "menus");

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Read all files in the `menus` folder
    const files = fs.readdirSync(menusFolder);

    // Loop through each file
    for (const file of files) {
      // Check if the file is a JSON file
      if (file.endsWith(".json")) {
        const filePath = path.join(menusFolder, file);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        // Create a new menu group
        const newMenuGroup = new Menu({
          groupName: data.groupName,
          categories: data.categories,
        });

        await newMenuGroup.save();
        console.log(`Seeded ${data.groupName} from ${file}`);
      }
    }

    console.log("Database seeding completed!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding script
seedDatabase();