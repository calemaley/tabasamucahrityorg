import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Eye, LogOut, Mail, Phone, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ADMIN_USER = "teamtabasamu";
const ADMIN_PASS = "teamtabasamu908Q@2025";

interface TrackedEvent {
  id: string;
  type: string;
  payload: any;
  ts: number;
}

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("samu_auth", "1");
      onLogin();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-charity-orange-600 to-charity-green-600 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-charity-neutral-800">
            Tabasamu Admin
          </h1>
          <p className="text-charity-neutral-600">Sign in to /samu dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-charity-orange-500"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-charity-orange-500"
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button className="w-full px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-bold flex items-center justify-center gap-2">
            Login <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [events, setEvents] = useState<TrackedEvent[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});

  // Load initial data
  useEffect(() => {
    fetch("/api/admin/events")
      .then((r) => r.json())
      .then((d) => setEvents(d.events || []));
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setCounts(d.counts || {}));
  }, []);

  // SSE realtime stream
  useEffect(() => {
    const es = new EventSource("/api/admin/events/stream");
    es.onmessage = (msg) => {
      try {
        const evt: TrackedEvent = JSON.parse(msg.data);
        setEvents((prev) => [evt, ...prev].slice(0, 500));
        setCounts((c) => ({ ...c, [evt.type]: (c[evt.type] || 0) + 1 }));
      } catch {}
    };
    return () => es.close();
  }, []);

  const total = useMemo(() => events.length, [events]);

  return (
    <div className="min-h-screen bg-charity-neutral-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Tabasamu Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-charity-orange-600 hover:underline flex items-center gap-1"
            >
              <Eye className="h-4 w-4" /> View Site
            </Link>
            <button
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg bg-charity-neutral-200 hover:bg-charity-neutral-300 flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Events", value: total },
            {
              label: "Contacts",
              value: counts["contact_submit"] || 0,
              icon: Mail,
            },
            {
              label: "Newsletter",
              value: counts["newsletter_subscribe"] || 0,
              icon: Users,
            },
            {
              label: "Volunteers",
              value: counts["volunteer_application"] || 0,
              icon: Users,
            },
          ].map((card, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow border">
              <div className="text-charity-neutral-500 text-sm">
                {card.label}
              </div>
              <div className="text-3xl font-bold">{card.value}</div>
            </div>
          ))}
        </div>

        {/* Recent events */}
        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="p-4 font-bold border-b">Recent Activity</div>
          <div className="max-h-[560px] overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-charity-neutral-100">
                <tr>
                  <th className="text-left p-3">Time</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e.id} className="border-b last:border-0">
                    <td className="p-3 whitespace-nowrap">
                      {new Date(e.ts).toLocaleString()}
                    </td>
                    <td className="p-3 font-medium">{e.type}</td>
                    <td className="p-3">
                      <pre className="whitespace-pre-wrap text-xs text-charity-neutral-600">
                        {JSON.stringify(e.payload, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [auth, setAuth] = useState<boolean>(
    localStorage.getItem("samu_auth") === "1",
  );
  return auth ? (
    <AdminDashboard
      onLogout={() => {
        localStorage.removeItem("samu_auth");
        setAuth(false);
      }}
    />
  ) : (
    <Login onLogin={() => setAuth(true)} />
  );
};

export default Admin;
