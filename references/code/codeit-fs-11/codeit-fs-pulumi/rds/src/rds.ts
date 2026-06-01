import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { withPrefix } from "./utils";

interface CreateRdsArgs {
  vpcId: pulumi.Input<string>; // Pulumi가 지금 바로 아는 문자열뿐 아니라, 다른 리소스 생성 뒤에 결정되는 출력값도 받을 수 있는 타입입니다.
  privateSubnetIds: pulumi.Input<string>[];
  webSecurityGroupId: pulumi.Input<string>;
  dbPassword: pulumi.Output<string>;
}

export function createRds(args: CreateRdsArgs) {
  const dbSubnetGroupName = withPrefix("db-subnets");
  const dbSubnetGroup = new aws.rds.SubnetGroup(
    dbSubnetGroupName,
    {
      subnetIds: args.privateSubnetIds,
      tags: { Name: dbSubnetGroupName },
    },
  );

  const dbSgName = withPrefix("rds-sg");
  const dbSecurityGroup = new aws.ec2.SecurityGroup(
    dbSgName,
    {
      vpcId: args.vpcId,
      ingress: [
        {
          protocol: "tcp",
          fromPort: 5432,
          toPort: 5432,
          securityGroups: [args.webSecurityGroupId],
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
      tags: { Name: dbSgName },
    },
  );

  const appDbName = withPrefix("rds-db-name");
  const appDb = new aws.rds.Instance(appDbName, {
    engine: "postgres",
    engineVersion: "16", // 메이저 버전만 지정. AWS가 최신 마이너 버전을 자동 선택합니다.
    instanceClass: "db.t4g.micro",
    allocatedStorage: 20, // DB 인스턴스에 할당할 스토리지 크기(GB)입니다.
    storageType: "gp2", // 실습 비용을 Free Tier 기준에 맞추기 위해 범용 SSD(gp2)를 사용합니다.
    username: "postgres",
    password: args.dbPassword,
    dbSubnetGroupName: dbSubnetGroup.name,
    vpcSecurityGroupIds: [dbSecurityGroup.id],
    publiclyAccessible: false, // 퍼블릭 IP를 통한 인터넷 직접 접근을 허용하지 않습니다.
    backupRetentionPeriod: 1, // 자동 백업을 1일 보존합니다., free tier가 아니면 7일 정도로 유지합니다.
    skipFinalSnapshot: true, // ⚠️ 실습 전용. 운영 환경에서는 반드시 false로 변경하세요.
    multiAz: false,
    tags: { Name: appDbName },
  });

  return { appDb };
}
