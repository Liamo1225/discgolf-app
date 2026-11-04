import { Routes, Route, Link } from "react-router-dom";

/* Placeholder */
const Page = ({ title }: { title: string }) => (
  <div>
    <Link to="/">Home</Link>
    <h1>{title}</h1>
  </div>
);

/* Placeholder */
const Home = () => (
  <div>
    <h1>Disc Golf</h1>
    <nav style={{ display: "grid", gap: 8 }}>
      <Link to="/new">Start</Link>
      <Link to="/players">Players</Link>
      <Link to="/history">History</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/records">Records</Link>
    </nav>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/new" element={<Page title="New game" />} />
      <Route path="/play/:roundId" element={<Page title="Scorecard" />} />

      <Route path="/players" element={<Page title="Players" />} />
      <Route path="/players/:id" element={<Page title="Player" />} />

      <Route path="/history" element={<Page title="History" />} />
      <Route path="/rounds/:id" element={<Page title="Round overview" />} />

      <Route path="/courses" element={<Page title="Courses" />} />
      <Route path="/courses/:id" element={<Page title="Course" />} />

      <Route path="/records" element={<Page title="Records" />} />
    </Routes>
  );
}
