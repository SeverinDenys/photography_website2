export default function Sidebar({
  photoSessionData,
  onSelectPhotoSession,
  onCreateNewPhotoSession,
  onDeleteNewPhotoSession,
  selectedId,
}) {
  return (
    <div className="sidebar">
      <ul>
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
      <button
        className="deletePhotoSession"
        onClick={() => onDeleteNewPhotoSession(selectedId)}
      >
        - delete Photo Session
      </button>
    </div>
  );
}
