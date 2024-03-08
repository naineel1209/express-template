import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import { rateLimit } from "express-rate-limit";
import path from "path";
import logger from "./config/winston.config";
import connectDB from "./db/db.config";
import CustomError from "./errors/CustomError";
import errorThrower from "./errors/errorThrower";
import { ErrorResponse } from "./interfaces/errorResponseInterface";
import authRoutes from "./routes/auth.routes";
config();

const app = express();
const port = process.argv[3] || process.env.PORT || 3000;

app.use(express.static(path.join('public')))
  .use(express.json())
  .use(cookieParser())
  .use(rateLimit({
    windowMs: 2 * 60 * 1000,
    limit: 10,
    standardHeaders: true
  }))
  .set('views', path.join('views'))
  .set('view engine', 'ejs');

//make a logger in general
app.use((req, res, next) =>
{
  logger.info(`${req.baseUrl} :: ${req.hostname} :: ${req.url} :: ${req.subdomains}`);
  next();
});

app.get('/', (req, res) =>
{
  res.render('index');
});

app.use('/auth', authRoutes)

//page not found - error - has to be second last route
app.use("*", (req, res) =>
{
  throw errorThrower(404, "Page Not Found!")
});

//error handler
app.use((err: CustomError, req, res, next) =>
{

  //only log the internal server errors
  if (err.statusCode >= 500)
  {
    logger.error(`${req.baseUrl} :: ${req.hostname} :: ${req.url} :: ${err.statusMessage} :: ${err.message} `)
  }

  //!send the error to the user
  const errObj: ErrorResponse = {
    message: err.message,
  }

  if (process.env.NODE_ENV === "dev")
  {
    errObj.cause = err?.cause;
    errObj.stack = err?.stack
  }

  //!return with response
  res.status(err.statusCode).send(errObj);
})

async function main()
{
  await connectDB(process.env.DB_URI);

  app.listen(port, () =>
  {
    console.log(`Listening on http://localhost:${port}`);
  });
}

main();