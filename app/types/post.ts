export interface PostDto {
  id: number;
  title: string;
  content: string;
}

export interface PostWithContentDto extends PostDto {}
