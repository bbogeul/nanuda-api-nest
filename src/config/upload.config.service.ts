import Debug from 'debug';
import { basename } from 'path';

const debug = Debug(`app:${basename(__dirname)}:${basename(__filename)}`);

// 받을 수 있는 파일 유형
// 일단은 이미지만 받는 형
export enum FileType {
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
}
type S3BucketInfo = {
  bucketName: string;
};
type S3BucketInfoEnvironments = {
  [key in 'production' | 'staging' | 'development']: S3BucketInfo;
};

type UploadOption = {
  path: string;
  sizeLimit: number;
  fileType: FileType;
};

// TODO: ADD APPROPRIATE VALUES AFTER DISCUSSION
export class UploadConfigService {}
