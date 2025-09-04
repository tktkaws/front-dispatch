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

export type AboutInfo = {
  fieldId: 'info';
  title: string;
  desc: string;
};

export type About = {
  id: string;
  title: string;
  body: string;
  info_repeat: AboutInfo[];
  updatedAt?: string;
  createdAt?: string;
};
