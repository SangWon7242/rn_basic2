export interface PostDto {
  id: string;
  postId: number;
  title: string;
  content: string;
}

export interface PostWithContentDto extends PostDto {}
