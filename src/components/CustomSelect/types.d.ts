
  export type Props =  {
    options: string[];
    defaultSelected?: string;
    placeholder?: string;
    label?: string;  // Add label prop
    id?: string;     // Add id prop for accessibility
    onSelect: (value: string | null) => void;
  }