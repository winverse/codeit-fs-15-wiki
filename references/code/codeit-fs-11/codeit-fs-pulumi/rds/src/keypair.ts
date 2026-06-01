import * as awsNative from "@pulumi/aws-native";
import { withPrefix } from "./utils";
import { ProviderResource } from "@pulumi/pulumi";

export function createWebKeyPair(
  provider: ProviderResource,
) {
  const webKeyPairName = withPrefix("web-key");
  const webKeyPair = new awsNative.ec2.KeyPair(
    webKeyPairName,
    {
      keyName: webKeyPairName,
      keyType: "rsa",
      keyFormat: "pem",
    },
    {
      provider,
    },
  );

  return {
    webKeyPairName,
    webKeyPair,
  };
}
