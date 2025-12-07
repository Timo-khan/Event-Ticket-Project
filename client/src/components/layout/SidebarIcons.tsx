const icons = ["⚾️", "🏟️", "🎵", "🏈", "⚽️", "🎭", "💬"];

export default function SidebarIcons() {
	return (
		<div className="sidebar-rail">
			{icons.map((i, idx) => (
				<div key={idx} className="sidebar-rail-item">
					{i}
				</div>
			))}
		</div>
	);
}
