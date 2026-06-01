import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsNative from "@pulumi/aws-native";
import { createNetwork } from "./network";
import { createWebSecurityGroup } from "./security";
import { createWebKeyPair } from "./keypair";
import { createWebServer } from "./compute";
import { createS3AccessProfile } from "./iam";

const config = new pulumi.Config();
const myIpCidr = config.require("myIpCidr");
const region = aws.config.requireRegion();
const s3BucketArn = config.get("s3BucketArn");

const {
  vpc,
  publicSubnetA,
  privateSubnetA,
  privateSubnetC,
} = createNetwork();

const { webSecurityGroup } = createWebSecurityGroup(
  vpc.id,
  myIpCidr,
);

const provider = new awsNative.Provider(
  "aws-native-provider",
  {
    region,
  },
);

const { webKeyPairName, webKeyPair } =
  createWebKeyPair(provider);

const s3AccessProfile = s3BucketArn
  ? createS3AccessProfile({ bucketArn: s3BucketArn })
  : undefined;

const { webServer } = createWebServer({
  subnetId: publicSubnetA.id,
  securityGroupId: webSecurityGroup.id,
  webKeyPairName,
  webKeyPair,
  instanceProfileName:
    s3AccessProfile?.ec2InstanceProfile.name,
});

export const vpcId = vpc.id;
export const publicSubnetId = publicSubnetA.id;
export const privateSubnetIds = [
  privateSubnetA.id,
  privateSubnetC.id,
];
export const webKeyPairId = webKeyPair.keyPairId;
export const webPublicIp = webServer.publicIp;
export const webPrivateIp = webServer.privateIp;
export const webSecurityGroupId = webSecurityGroup.id;
