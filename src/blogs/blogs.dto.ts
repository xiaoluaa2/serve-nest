export class CreateBlogsDTO {
  // readonly _id: string;
  Title: string;
  order: string;
  Summary: string;
  Content: string;
  CreateDate: string;
  ArticleTag: string;
  ArticleCover: string;

  CommentNum: number;
}

// 编辑用户
export class EditBlogsDTO {
  Title: string;
  order: string;
  Summary: string;
  Content: string;
  CreateDate: string;
  ArticleTag: string;
  ArticleCover: string;
}
