import * as aws from "@pulumi/aws";
import { withPrefix } from "./utils";

export function createNetwork() {
  const vpcName = withPrefix("vpc");
  const vpc = new aws.ec2.Vpc(vpcName, {
    cidrBlock: "10.10.0.0/16",
    enableDnsSupport: true,
    enableDnsHostnames: true,
    tags: { Name: vpcName },
  });

  const publicSubnetAName = withPrefix("public-a");
  const publicSubnetA = new aws.ec2.Subnet(
    publicSubnetAName,
    {
      vpcId: vpc.id,
      cidrBlock: "10.10.0.0/24",
      availabilityZone: "ap-northeast-2a",
      mapPublicIpOnLaunch: false, // 퍼블릭 IP를 자동 할당하는 옵션입니다. 여기서는 false로 하겠습니다.
      tags: { Name: publicSubnetAName },
    },
  );

  const privateSubnetAName = withPrefix("private-a");
  const privateSubnetA = new aws.ec2.Subnet(
    privateSubnetAName,
    {
      vpcId: vpc.id,
      cidrBlock: "10.10.10.0/24",
      availabilityZone: "ap-northeast-2a",
      tags: { Name: privateSubnetAName },
    },
  );

  const privateSubnetCName = withPrefix("private-c");
  const privateSubnetC = new aws.ec2.Subnet(
    privateSubnetCName,
    {
      vpcId: vpc.id,
      cidrBlock: "10.10.20.0/24",
      availabilityZone: "ap-northeast-2c",
      tags: { Name: privateSubnetCName },
    },
  );

  const internetGatewayName = withPrefix("igw");
  const internetGateway = new aws.ec2.InternetGateway(
    internetGatewayName,
    {
      vpcId: vpc.id,
      tags: { Name: internetGatewayName },
    },
  );

  const publicRouteTableName = withPrefix("public-rt");
  const publicRouteTable = new aws.ec2.RouteTable(
    publicRouteTableName,
    {
      vpcId: vpc.id,
      routes: [
        {
          cidrBlock: "0.0.0.0/0",
          gatewayId: internetGateway.id,
        },
      ],
      tags: { Name: publicRouteTableName },
    },
  );

  const publicSubnetAAssocName = withPrefix(
    "public-a-assoc",
  );

  new aws.ec2.RouteTableAssociation(
    publicSubnetAAssocName,
    {
      subnetId: publicSubnetA.id,
      routeTableId: publicRouteTable.id,
    },
  );

  return {
    vpc,
    publicSubnetA,
    privateSubnetA,
    privateSubnetC,
  };
}
