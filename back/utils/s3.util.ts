interface fileDto extends Express.Multer.File {
  location: string;
  mimetype: string;
}

export const getPartialFilesInfo = (files: Express.Multer.File[]) => {
  const contentsInfos = files.map((v: fileDto, i: number) => {
    return {
      url: v.location,
      mimeType: v.mimetype,
    };
  });
  return contentsInfos;
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
