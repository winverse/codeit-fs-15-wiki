import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsNative from "@pulumi/aws-native";

import { createWebServer } from "./compute";
import { createWebKeyPair } from "./keypair";
import { createNetwork } from "./network";
import { createRds } from "./rds";
import { createWebSecurityGroup } from "./security";

const config = new pulumi.Config();
const myIpCidr = config.require("myIpCidr");
const dbPassword = config.requireSecret("dbPassword");
const region = aws.config.requireRegion();

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

const { webServer } = createWebServer({
  subnetId: publicSubnetA.id,
  securityGroupId: webSecurityGroup.id,
  webKeyPairName,
  webKeyPair,
});

const { appDb } = createRds({
  vpcId: vpc.id,
  privateSubnetIds: [privateSubnetA.id, privateSubnetC.id],
  webSecurityGroupId: webSecurityGroup.id,
  dbPassword,
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
export const dbEndpoint = appDb.address;
export const dbPort = appDb.port;
