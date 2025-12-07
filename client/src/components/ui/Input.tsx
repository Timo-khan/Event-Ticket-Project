import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	hint?: string;
	error?: string;
	rightSlot?: React.ReactNode;
};

export default function Input({
	label,
	hint,
	error,
	rightSlot,
	style,
	...rest
}: InputProps) {
	return (
		<label style={{ display: "grid", gap: 6, fontWeight: 700 }}>
			{label && <span style={{ fontSize: 14 }}>{label}</span>}

			<div style={{ position: "relative" }}>
				<input
					{...rest}
					style={{
						width: "100%",
						padding: rightSlot ? "10px 42px 10px 12px" : "10px 12px",
						borderRadius: 10,
						border: `1px solid ${error ? "#ef4444" : "var(--border)"}`,
						outline: "none",
						fontSize: 14,
						boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
						...style,
					}}
					onFocus={(e) => {
						e.currentTarget.style.borderColor = "var(--blue)";
						rest.onFocus?.(e);
					}}
					onBlur={(e) => {
						e.currentTarget.style.borderColor = error
							? "#ef4444"
							: "var(--border)";
						rest.onBlur?.(e);
					}}
				/>

				{rightSlot && (
					<div
						style={{
							position: "absolute",
							right: 10,
							top: "50%",
							transform: "translateY(-50%)",
							display: "grid",
							placeItems: "center",
						}}
					>
						{rightSlot}
					</div>
				)}
			</div>

			{error ? (
				<span style={{ fontSize: 12, color: "#ef4444" }}>{error}</span>
			) : hint ? (
				<span style={{ fontSize: 12, color: "var(--muted)" }}>{hint}</span>
			) : null}
		</label>
	);
}
