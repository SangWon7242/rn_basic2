import { Timestamp } from "firebase/firestore";

export interface PostDto {
  id: string;
  createDate: Timestamp;
  title: string;
  content: string;
}

export interface PostWithContentDto extends PostDto {}
