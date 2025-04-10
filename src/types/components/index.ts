export type TextInputType = {
  type: string;
  label: string;
  placeholder?: string;
  onChange: (e: any) => void;
  name: string;
  high?: boolean;
};
