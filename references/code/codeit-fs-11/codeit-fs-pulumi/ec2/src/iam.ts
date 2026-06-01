import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { withPrefix } from "./utils";

interface CreateS3AccessProfileArgs {
  bucketArn: pulumi.Input<string>; // 다른 스택 출력처럼 나중에 결정되는 버킷 ARN도 그대로 받을 수 있습니다.
}

export function createS3AccessProfile(
  args: CreateS3AccessProfileArgs,
) {
  const ec2S3RoleName = withPrefix("ec2-s3-role");
  const ec2S3Role = new aws.iam.Role(ec2S3RoleName, {
    name: ec2S3RoleName,
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
      Service: "ec2.amazonaws.com",
    }),
  });

  const s3AccessPolicyName = withPrefix("ec2-s3-policy");
  const s3AccessPolicy = new aws.iam.RolePolicy(
    s3AccessPolicyName,
    {
      name: s3AccessPolicyName,
      role: ec2S3Role.id,
      policy: pulumi.jsonStringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Action: ["s3:ListBucket"],
            Resource: [args.bucketArn],
          },
          {
            Effect: "Allow",
            Action: ["s3:GetObject", "s3:PutObject"],
            Resource: [
              pulumi.interpolate`${args.bucketArn}/*`,
            ],
          },
        ],
      }),
    },
  );

  const ec2InstanceProfileName = withPrefix(
    "ec2-s3-profile",
  );
  const ec2InstanceProfile = new aws.iam.InstanceProfile(
    ec2InstanceProfileName,
    {
      name: ec2InstanceProfileName,
      role: ec2S3Role.name,
    },
    {
      dependsOn: [s3AccessPolicy],
    },
  );

  return {
    ec2S3Role,
    s3AccessPolicy,
    ec2InstanceProfile,
  };
}
