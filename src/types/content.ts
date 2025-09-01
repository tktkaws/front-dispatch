export type Tag = {
  id: string;
  title: string;
  slug: string;
};

export type Article = {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  updatedAt: string;
};

