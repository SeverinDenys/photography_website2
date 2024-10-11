export default function Sidebar({
  photoSessionData,
  onSelectPhotoSession,
  onCreateNewPhotoSession
}) {
  return (
    <div className="sidebar">
      <ul>
        {photoSessionData &&
          photoSessionData.map((session, index) => (
            <li
              onClick={() => onSelectPhotoSession(session)}
              key={index}
            >
              {session.title}
            </li>
          ))}
      </ul>
      <button onClick={onCreateNewPhotoSession}>+ Add Photo Session</button>
    </div>
  );
}
