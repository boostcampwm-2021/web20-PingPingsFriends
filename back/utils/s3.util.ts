import { CreateContentDto } from "src/contents/dto/create-content.dto";

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

export const getPartialFilesInfo = (files: Express.Multer.File[]) => {
  const contentsInfos = files.map((v: FileDto, i: number) => {
    return {
      url: v.transforms[0].location,
      mimeType: v.mimetype,
    };
  });
  return contentsInfos;
};

export const getPartialFileInfo = (
  file?: FileDto
): CreateContentDto | undefined => {
  if (!file) return undefined;

  const contentInfo = {
    url: file.transforms[0].location,
    mimeType: file.mimetype,
  };
  return contentInfo;
};

// Test code
// @Injectable()
// export class S3Service {
//   uploadS3(@Req() req: Request, @Res() res: Response) {
//     return new Promise((resolve, reject) => {
//       this.upload(req, res, (err: any) => {
//         if (err) reject();

//         const files = req.files;

//         console.log(files);

//         if (Array.isArray(files)) {
//           const contentsInfos = files.map((v: fileDto, i: number) => {
//             return {
//               location: v.location,
//               mimetype: v.mimetype,
//             };
//           });
//           resolve(contentsInfos);
//         }
//       });
//     });
//   }

//   upload = multer(multerOption).array('upload', 10);
// }
