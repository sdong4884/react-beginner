export enum TOPIC_STATUS {
  TEMP = "temp",
  PUBLICH = "publish",
}

export interface Topic {
  id: number;
  created_at: Date | string;
  author: string;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  status: string;
}
