import { Nullable } from './helpers';

export type SelectOption = {
  label: string;
  value: Nullable<string>;
};

export type ActionOption = {
  text: string;
  action: VoidFunction;
};

export type BreadCrumbItem = {
  text: string;
  link?: string;
};
