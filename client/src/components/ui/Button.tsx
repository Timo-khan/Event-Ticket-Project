import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: Variant;
	size?: Size;
	fullWidth?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
};

const variantStyles: Record<Variant, React.CSSProperties> = {
	primary: {
		background: "var(--blue)",
		color: "white",
		border: "none",
	},
	secondary: {
		background: "white",
		color: "var(--text)",
		border: "1px solid var(--border)",
	},
	ghost: {
		background: "transparent",
		color: "var(--text)",
		border: "none",
	},
	danger: {
		background: "#ef4444",
		color: "white",
		border: "none",
	},
};

const sizeStyles: Record<Size, React.CSSProperties> = {
	sm: { padding: "6px 10px", fontSize: 13, borderRadius: 8 },
	md: { padding: "10px 14px", fontSize: 14, borderRadius: 10 },
	lg: { padding: "12px 16px", fontSize: 16, borderRadius: 12 },
};

export default function Button({
	variant = "primary",
	size = "md",
	fullWidth,
	leftIcon,
	rightIcon,
	style,
	children,
	disabled,
	...rest
}: ButtonProps) {
	return (
		<button
			disabled={disabled}
			{...rest}
			style={{
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				gap: 8,
				fontWeight: 800,
				cursor: disabled ? "not-allowed" : "pointer",
				opacity: disabled ? 0.6 : 1,
				transition:
					"transform .04s ease, background .15s ease, border .15s ease",
				width: fullWidth ? "100%" : undefined,
				...sizeStyles[size],
				...variantStyles[variant],
				...style,
			}}
			onMouseDown={(e) => {
				rest.onMouseDown?.(e);
				(e.currentTarget as HTMLButtonElement).style.transform =
					"translateY(1px)";
			}}
			onMouseUp={(e) => {
				rest.onMouseUp?.(e);
				(e.currentTarget as HTMLButtonElement).style.transform =
					"translateY(0)";
			}}
		>
			{leftIcon}
			{children}
			{rightIcon}
		</button>
	);
}
