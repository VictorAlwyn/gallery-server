import aws from "aws-sdk";
import env from "./environment";

export const s3Singleton = new aws.S3({
  region: env.aws.s3_region,
  accessKeyId: env.aws.aws_access_key,
  secretAccessKey: env.aws.aws_secret_key,
});
