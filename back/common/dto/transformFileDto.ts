interface Transforms {
  id: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  contentDisposition: any;
  storageClass: string;
  serverSideEncryption: any;
  metadata: any;
  location: string;
  etag: string;
}

interface FileDto extends Express.Multer.File {
  location: string;
  mimetype: string;
  transforms: Transforms[];
}

export default FileDto;
