import React from "react";

export default function Spinner({ size = 28 }: { size?: number }) {
	return (
		<div
			style={{
				width: size,
				height: size,
				borderRadius: "50%",
				border: "3px solid var(--border)",
				borderTopColor: "var(--blue)",
				animation: "spin 0.9s linear infinite",
			}}
		/>
	);
}
