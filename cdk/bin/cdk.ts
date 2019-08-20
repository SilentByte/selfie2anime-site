#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
new CdkStack(app, 'selfie2anime-stack');
