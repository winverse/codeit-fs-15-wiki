import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { withPrefix } from "./utils";

export function createWebSecurityGroup(
  vpcId: pulumi.Input<string>, // Pulumi가 지금 바로 아는 문자열뿐 아니라, 다른 리소스 생성 뒤에 결정되는 출력값도 받을 수 있는 타입입니다.
  myIpCidr: string,
) {
  const webSecurityGroupName = withPrefix("web-sg");
  const webSecurityGroup = new aws.ec2.SecurityGroup(
    webSecurityGroupName,
    {
      vpcId,
      ingress: [
        {
          protocol: "tcp",
          fromPort: 22,
          toPort: 22,
          cidrBlocks: [myIpCidr],
        },
        {
          protocol: "tcp",
          fromPort: 80,
          toPort: 80,
          cidrBlocks: ["0.0.0.0/0"],
        },
      ],
      egress: [
        {
          protocol: "-1",
          fromPort: 0,
          toPort: 0,
          cidrBlocks: ["0.0.0.0/0"],
        },
      ],
      tags: { Name: webSecurityGroupName },
    },
  );

  return { webSecurityGroup };
}
