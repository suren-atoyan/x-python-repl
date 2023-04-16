type InputIndexProps = {
  isLoading?: boolean;
  value?: string;
  index: number;
  containerStyles?: Record<string, CSSStyleRule>;
};

type IndexNumberProps = {
  index: number;
  isLoading: boolean;
};

export type { InputIndexProps, IndexNumberProps };
