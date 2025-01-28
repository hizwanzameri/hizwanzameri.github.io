const MenuItem = ({ children, click, setPageId, pageId }) => {
    return (
        <div onClick={() => {
            click(true)
            setPageId(pageId)
        }} className="cursor-pointer rounded-full border border-white/20 px-4 py-2 text-sm">{children}</div>
    )
}

export default function Navigation({ showProfile, setPageId }) {
    return (
        <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-3 ">
            <MenuItem click={showProfile} setPageId={setPageId} pageId={'myprofile'}>My Profile</MenuItem>
            <MenuItem click={showProfile} setPageId={setPageId} pageId={'assignments'}><b>SECP1513</b> Technology & Information System - Assignments & Reflections</MenuItem>
        </div>
    )
}