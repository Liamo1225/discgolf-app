export function Button({ children, onClick, extraClass = "", active = true }) {
  return (
    <button
      className={`btn ${active ? "active" : ""} ${extraClass}`}
      onClick={(e) => {
        if (active && onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </button>
  );
}
