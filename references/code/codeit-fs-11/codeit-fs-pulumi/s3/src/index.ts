import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { withPrefix } from "./utils";

const config = new pulumi.Config();
const bucketName = config.require("bucketName");

const appBucketName = withPrefix(bucketName);
const appBucket = new aws.s3.Bucket(appBucketName, {
  bucket: bucketName,
  forceDestroy: true, // ⚠️ 실습 전용. 운영에서는 false
  tags: {
    Name: bucketName,
    Service: "codeit-aws-foundation",
  },
});

const bucketAccessBlockName = withPrefix(
  "bucket-public-access-block",
);
new aws.s3.BucketPublicAccessBlock(bucketAccessBlockName, {
  bucket: appBucket.id,
  blockPublicAcls: true,
  blockPublicPolicy: true,
  ignorePublicAcls: true,
  restrictPublicBuckets: true,
});

const bucketVersioningName = withPrefix(
  "bucket-versioning",
);
new aws.s3.BucketVersioning(bucketVersioningName, {
  bucket: appBucket.id,
  versioningConfiguration: {
    status: "Enabled",
  },
});

export const s3BucketName = appBucket.bucket;
export const s3BucketArn = appBucket.arn;
