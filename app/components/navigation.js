const MenuItem = ({ children }) => {
    return (
        <div className="rounded-full border border-white/20 px-4 py-2 text-sm">{children}</div>
    )
}

export default function Navigation() {
    return (
        <div className="fixed bottom-10 flex flex-row gap-3">
            <MenuItem>My Profile</MenuItem>
            <MenuItem>Technology & Information System - Assignments & Reflection</MenuItem>
        </div>
    )
}