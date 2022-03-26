import * as dotenv from "dotenv";
import * as joi from "joi";

dotenv.config({ path: `.${process.env.NODE_ENV}.env` });

const envVarsSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid("prod", "dev").required(),
    DB_PORT: joi.string().required(),
    DB_HOSTNAME: joi.string().required(),
    DB_USERNAME: joi.string().required(),
    DB_NAME: joi.string().required(),
    AWS_S3_REGION: joi.string().required(),
    AWS_S3_ACCESS_KEY_ID: joi.string().required(),
    AWS_S3_SECRET_ACCESS_KEY: joi.string().required(),
    AWS_S3_BUCKET_NAME: joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT || 4000,
  db: {
    port: envVars.DB_PORT,
    hostname: envVars.DB_HOSTNAME,
    username: envVars.DB_USERNAME,
    database: envVars.DB_NAME,
    password: envVars.DB_PASSWORD || "",
  },
  aws: {
    s3_region: envVars.AWS_S3_REGION,
    aws_access_key: envVars.AWS_S3_ACCESS_KEY_ID,
    aws_secret_key: envVars.AWS_S3_SECRET_ACCESS_KEY,
    s3_bucket_name: envVars.AWS_S3_BUCKET_NAME,
  },
};
