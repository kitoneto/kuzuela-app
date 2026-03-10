export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ColorScheme = 'purple' | 'green' | 'blue' | 'red' | 'yellow' | 'gray';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
