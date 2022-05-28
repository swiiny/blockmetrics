// Extend HTML DOM elements for React
declare module 'react' {
	interface HTMLAttributes<T> extends DOMAttributes<T> {
		// extends React's HTMLAttributes
		size?: ESize | null;
		icon?: EIcon | null;
		as?: string;
		isSelected?: boolean;
		height?: number | string | null; // Collapse
		disabled?: boolean;
		textColor?: ETextColor;
	}
}
