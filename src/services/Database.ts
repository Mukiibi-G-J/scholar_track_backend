// import { MONGO_URI } from "../config";
// import mongoose from "mongoose";

// export default async () => {
//   try {
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       //   useCreateIndex: true,
//     });
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };

import { MONGO_URI } from "../config";

const mongoose = require("mongoose");

export default async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
