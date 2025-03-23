export interface IKanbanDateFilter {
  variables?: DateFilter[];
  onChange: (value: string | null) => void;
}

export interface DateFilter {
  id: string;
  title: string;
  value: Date | null;
}
