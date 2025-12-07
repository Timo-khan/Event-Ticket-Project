import React from "react";

type Tone = "blue" | "gray" | "green" | "yellow" | "red";

const tones: Record<Tone, React.CSSProperties> = {
	blue: { background: "#e8f1ff", color: "#1f6fe0" },
	gray: { background: "#f3f4f6", color: "#374151" },
	green: { background: "#ecfdf3", color: "#16a34a" },
	yellow: { background: "#fff7ed", color: "#c2410c" },
	red: { background: "#fef2f2", color: "#dc2626" },
};

export default function Badge({
	children,
	tone = "gray",
	style,
}: {
	children: React.ReactNode;
	tone?: Tone;
	style?: React.CSSProperties;
}) {
	return (
		<span
			style={{
				display: "inline-flex",
				alignItems: "center",
				padding: "4px 8px",
				fontSize: 12,
				fontWeight: 800,
				borderRadius: 999,
				...tones[tone],
				...style,
			}}
		>
			{children}
		</span>
	);
}
