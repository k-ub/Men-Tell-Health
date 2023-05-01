import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    articleType: string,
    // location: string,
    price: number | undefined,
}

export interface ArticleCardProps {
  id?: BaseKey | undefined,
  title: string,
  // location: string,
  price: string,
  photo: string,
}
