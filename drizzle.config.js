/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://ai%20interview%20database_owner:Di2usEw8KmNP@ep-bold-haze-a5o0in5r.us-east-2.aws.neon.tech/aiInterviewDb?sslmode=require",
    }
  };
  