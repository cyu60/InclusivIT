import { ReactElement } from "react";


export type FeedbackMetric = {
  score: number;
  feedback: string;
};

export type FeedbackData = {
  pronounUsage: FeedbackMetric;
  insenstiveLanguage: FeedbackMetric;
  stereotypes: FeedbackMetric;
  exclusiveLanguage: FeedbackMetric;
  inclusivePhrases: FeedbackMetric;
  improvedText: string;
  [key: string]: FeedbackMetric | string;
};
export type Metric = {
  name: string;
  description: string;
  icon: ReactElement; // Assuming CodeIcon is a React component
} & FeedbackMetric;
