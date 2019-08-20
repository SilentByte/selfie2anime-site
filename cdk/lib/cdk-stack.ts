import cdk = require('@aws-cdk/core');
import codebuild = require("@aws-cdk/aws-codebuild");
import iam = require("@aws-cdk/aws-iam");

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // CloudWatch Log Read/Write Access
    const log_policy = new iam.PolicyStatement({
      actions: [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
      ],
      resources: [
        `arn:aws:logs:${cdk.Aws.REGION}:${cdk.Aws.ACCOUNT_ID}:/aws/codebuild/*`,
      ]
    });

    const s3_policy = new iam.PolicyStatement({
      actions: [
        "s3:*",
      ],
      resources: [
        "arn:aws:s3:::selfie2anime.com",
        "arn:aws:s3:::selfie2anime.com/*"
      ]
    });

    //
    // Source - (GitHub_Source)
    //
    const gitHubSource = codebuild.Source.gitHub({
      owner: "SilentByte",
      repo: "selfie2anime-site",
      reportBuildStatus: true
    });

    //
    // CodeBuild - Build
    //
    const buildProject = new codebuild.Project(this, "selfie2anime-build", {
      badge: true,
      projectName: "selfie2anime-build",
      buildSpec: codebuild.BuildSpec.fromSourceFilename("buildspec.yml"),
      source: gitHubSource,
      environment: {
        buildImage: codebuild.LinuxBuildImage.UBUNTU_14_04_NODEJS_10_14_1,
        environmentVariables: {
          S3_BUCKET: {
            type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
            value: "selfie2anime.com"
          }
        }
      },
    });
    buildProject.addToRolePolicy(log_policy);
    buildProject.addToRolePolicy(s3_policy);

  }
}
