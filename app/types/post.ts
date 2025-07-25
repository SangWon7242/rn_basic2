export type PostDto = {
  id: number;
  title: string;
  content: string;
};

export type PostWithContentDto = PostDto & {
  content: string;
};
