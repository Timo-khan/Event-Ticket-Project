import React, { useEffect } from "react";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	footer?: React.ReactNode;
	width?: number | string;
};

export default function Modal({
	open,
	onClose,
	title,
	children,
	footer,
	width = 520,
}: ModalProps) {
	useEffect(() => {
		const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
		if (open) window.addEventListener("keydown", onEsc);
		return () => window.removeEventListener("keydown", onEsc);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div
			onClick={onClose}
			style={{
				position: "fixed",
				inset: 0,
				background: "rgba(10, 13, 20, 0.5)",
				display: "grid",
				placeItems: "center",
				zIndex: 100,
			}}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="card"
				style={{
					width,
					maxWidth: "92vw",
					padding: 16,
					borderRadius: 16,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{title && (
						<div style={{ fontWeight: 900, fontSize: 18 }}>{title}</div>
					)}
					<button
						onClick={onClose}
						style={{
							border: "none",
							background: "transparent",
							fontSize: 20,
							cursor: "pointer",
						}}
					>
						×
					</button>
				</div>

				<div style={{ marginTop: 10 }}>{children}</div>

				{footer && (
					<div
						style={{
							marginTop: 14,
							paddingTop: 12,
							borderTop: "1px solid var(--border)",
							display: "flex",
							justifyContent: "flex-end",
							gap: 8,
						}}
					>
						{footer}
					</div>
				)}
			</div>
		</div>
	);
}
