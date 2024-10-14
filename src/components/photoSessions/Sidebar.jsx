export default function Sidebar({
  photoSessionData,
  onSelectPhotoSession,
  onCreateNewPhotoSession,
  selectedId,
}) {
  // console.log("selectedId", selectedId);
  // todo
  // if selecteId = session.id , then show the backlights, else - don't
  return (
    <div className="sidebar">
      <ul
        onClick={() => {
          console.log("clicked");
        }}
      >
        {photoSessionData &&
          photoSessionData.map((session, index) => (
            <li
              className="sidebar-item"
              onClick={() => onSelectPhotoSession(session)}
              key={index}
              style={
                selectedId === session.id
                  ? { backgroundColor: "lightsteelblue" }
                  : {}
              }
            >
              {session.title}
            </li>
          ))}
      </ul>
      <button onClick={onCreateNewPhotoSession}>
        + Add Photo Session
      </button>
    </div>
  );
}
