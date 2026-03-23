import { useState, useEffect, useRef } from "react";

// sample data 
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "HoD Review Update",
    status: "Approved",
    message: "Your research report has been approved successfully.",
    timestamp: new Date(),
    read: false,
  },
  {
    id: 2,
    title: "HoD Review Update",
    status: "Rejected",
    message: "Formatting issues found. Please correct and resubmit.",
    timestamp: new Date(),
    read: false,
  },
  {
    id: 3,
    title: "HoD Review Update",
    status: "Needs Revision",
    message: "Add more references in section 2.",
    timestamp: new Date(),
    read: false,
  },
  {
    id: 4,
    title: "HoD Review Update",
    status: "Approved",
    message: "Your attendance report has been approved.",
    timestamp: new Date(),
    read: false,
  },
  {
    id: 5,
    title: "HoD Review Update",
    status: "Rejected",
    message: "Data mismatch found in your submission.",
    timestamp: new Date(),
    read: false,
  },
];

// Bell Icon
function BellIcon({ unread, onClick }) {
  return (
    <button onClick={onClick} style={styles.bellBtn}>
      🔔
      {unread > 0 && <span style={styles.badge}>{unread}</span>}
    </button>
  );
}

// Notification Panel
function NotificationPanel({ notifications }) {
  return (
    <div style={styles.panel}>
      <h4 style={{ marginBottom: 10 }}>Notifications</h4>

      {notifications.map((n) => (
        <div key={n.id} style={styles.item}>
          <div style={{ fontWeight: "bold" }}>{n.title}</div>

          <div style={styles.status(n.status)}>
            {n.status}
          </div>

          <p style={{ fontSize: 13 }}>{n.message}</p>

          <span style={styles.time}>
            {n.timestamp.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// MAIN COMPONENT
export default function NotificationBell() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleOpen() {
    setOpen(!open);

    if (!open) {
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read: true }))
      );
    }
  }

  return (
    <div ref={ref} style={styles.container}>
      <BellIcon unread={unread} onClick={handleOpen} />

      {open && (
        <div style={styles.panelWrapper}>
          <NotificationPanel notifications={notifications} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 1000,
  },

  bellBtn: {
    position: "relative",
    fontSize: 22,
    padding: 10,
    background: "darkslateblue",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    color: "white",
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    background: "red",
    color: "white",
    borderRadius: "50%",
    fontSize: 10,
    padding: "2px 6px",
  },

  panelWrapper: {
    position: "absolute",
    top: "50px",
    right: 0,
  },

  panel: {
    width: 300,
    background: "black",
    color: "white",
    borderRadius: 12,
    padding: 15,
    boxShadow: "0 10px 30px black",
  },

  item: {
    borderBottom: "1px solid gray",
    padding: "10px 0",
  },

  status: (status) => ({
    fontSize: 12,
    fontWeight: "bold",
    color:
      status === "Approved"
        ? "green"
        : status === "Rejected"
        ? "red"
        : "orange",
  }),

  time: {
    fontSize: 10,
    color: "gray",
  },
};