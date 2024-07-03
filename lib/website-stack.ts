import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Hosting, RepositoryConnection } from "@aws/cloudfront-hosting-toolkit";
import * as path from "path";

export class WebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const config = {
      repoUrl: "https://github.com/non-97/nextjs-dashboard.git",
      branchName: "main",
      framework: "nextjs",
      domainName: "cf-hosting-toolkit.non-97.net",
      hostedZoneId: "Z05845813ALGIYU6AAH34",
    };
    const repositoryConnection = new RepositoryConnection(
      this,
      "RepositoryConnection",
      config
    );

    const hosting = new Hosting(this, "Hosting", {
      hostingConfiguration: config,
      buildFilePath: path.join(
        __dirname,
        "../cloudfront-hosting-toolkit/cloudfront-hosting-toolkit-build.yml"
      ),
      connectionArn: repositoryConnection.connectionArn,
      cffSourceFilePath: path.join(
        __dirname,
        "../cloudfront-hosting-toolkit/cloudfront-hosting-toolkit-cff.js"
      ),
    });
  }
}
