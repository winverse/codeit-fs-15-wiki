import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { withPrefix } from "./utils";

interface CreateWebServerArgs {
  subnetId: pulumi.Input<string>;
  securityGroupId: pulumi.Input<string>;
  webKeyPairName: string;
  webKeyPair: pulumi.Resource;
  instanceProfileName?: pulumi.Input<string>;
}
// 210.98.151.156/32

export function createWebServer(args: CreateWebServerArgs) {
  const amazonLinuxAmi = aws.ssm.getParameterOutput({
    name: "/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-6.1-x86_64",
  });

  const webServerName = withPrefix("web-server");
  const webServer = new aws.ec2.Instance(
    webServerName,
    {
      ami: amazonLinuxAmi.value,
      instanceType: "t3.micro",
      subnetId: args.subnetId,
      vpcSecurityGroupIds: [args.securityGroupId],
      associatePublicIpAddress: true,
      keyName: args.webKeyPairName,
      iamInstanceProfile: args.instanceProfileName,
      userData: `#!/bin/bash
echo "created by pulumi" > /var/tmp/user-data-check.txt
date >> /var/tmp/user-data-check.txt`,
      rootBlockDevice: {
        volumeType: "gp3",
        volumeSize: 20,
      },
      tags: { Name: webServerName },
    },
    {
      dependsOn: [args.webKeyPair],
    },
  );

  return { webServer };
}
