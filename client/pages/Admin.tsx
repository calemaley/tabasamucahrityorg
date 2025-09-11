import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, Eye, LogOut, Mail, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface TrackedEvent {
  id: string;
  type: string;
  payload: any;
  ts: number;
}

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Login failed");
        setLoading(false);
        return;
      }
      localStorage.setItem("samu_token", data.token);
      onLogin();
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-charity-orange-600 to-charity-green-600 p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-charity-neutral-800">Tabasamu Admin</h1>
          <p className="text-charity-neutral-600">Sign in to /samu dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-charity-orange-500" autoFocus />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-charity-orange-500" />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="w-full px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-bold flex items-center justify-center gap-2">
            {loading ? "Signing in..." : (<>Login <ArrowRight className="h-4 w-4" /></>)}
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [events, setEvents] = useState<TrackedEvent[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [contacts, setContacts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [donations, setDonations] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<string>("events");

  const [showProgramForm, setShowProgramForm] = useState(false);
  const [newProgram, setNewProgram] = useState({ title: "", slug: "", summary: "", content: "", image: "" });

  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", slug: "", excerpt: "", content: "", cover: "" });

  const [showMediaForm, setShowMediaForm] = useState(false);
  const [newMedia, setNewMedia] = useState({ name: "", url: "", meta: "{}" });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("samu_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const reloadAll = () => {
    const headers = getAuthHeaders();
    fetch("/api/admin/events", { headers }).then((r) => r.json()).then((d) => setEvents(d.events || []));
    fetch("/api/admin/stats", { headers }).then((r) => r.json()).then((d) => setCounts(d.counts || {}));
    fetch("/api/admin/contacts", { headers }).then((r) => r.json()).then((d) => setContacts(d.contacts || d));
    fetch("/api/admin/newsletter", { headers }).then((r) => r.json()).then((d) => setSubscribers(d.subscribers || d));
    fetch("/api/admin/volunteers", { headers }).then((r) => r.json()).then((d) => setVolunteers(d.volunteers || d));
    fetch("/api/admin/programs", { headers }).then((r) => r.json()).then((d) => setPrograms(d.programs || d));
    fetch("/api/admin/blog", { headers }).then((r) => r.json()).then((d) => setPosts(d.posts || d));
    fetch("/api/admin/donations", { headers }).then((r) => r.json()).then((d) => setDonations(d.donations || d));
    fetch("/api/admin/media", { headers }).then((r) => r.json()).then((d) => setMedia(d.media || d));
  };

  useEffect(() => { reloadAll(); }, []);

  useEffect(() => {
    const token = localStorage.getItem("samu_token");
    const url = token ? `/api/admin/events/stream?token=${encodeURIComponent(token)}` : "/api/admin/events/stream";
    const es = new EventSource(url);
    es.onmessage = (msg) => {
      try {
        const payload = JSON.parse(msg.data);
        if (payload?.type === "initial_events") setEvents(payload.data || []);
        else if (payload?.resource) reloadAll();
        else setEvents((prev) => [payload, ...prev].slice(0, 500));
      } catch (e) {}
    };
    return () => es.close();
  }, []);

  const total = useMemo(() => events.length, [events]);

  const doDelete = async (path: string) => {
    const headers = getAuthHeaders();
    await fetch(path, { method: "DELETE", headers });
    reloadAll();
  };

  const createProgram = async () => {
    const headers = { ...getAuthHeaders(), "Content-Type": "application/json" } as any;
    await fetch("/api/admin/programs", { method: "POST", headers, body: JSON.stringify(newProgram) });
    setShowProgramForm(false);
    setNewProgram({ title: "", slug: "", summary: "", content: "", image: "" });
    reloadAll();
  };

  const createPost = async () => {
    const headers = { ...getAuthHeaders(), "Content-Type": "application/json" } as any;
    await fetch("/api/admin/blog", { method: "POST", headers, body: JSON.stringify(newPost) });
    setShowPostForm(false);
    setNewPost({ title: "", slug: "", excerpt: "", content: "", cover: "" });
    reloadAll();
  };

  const createMedia = async () => {
    const headers = { ...getAuthHeaders(), "Content-Type": "application/json" } as any;
    let metaObj = {};
    try { metaObj = JSON.parse(newMedia.meta); } catch {}
    await fetch("/api/admin/media", { method: "POST", headers, body: JSON.stringify({ ...newMedia, meta: metaObj }) });
    setShowMediaForm(false);
    setNewMedia({ name: "", url: "", meta: "{}" });
    reloadAll();
  };

  const backupDb = async () => {
    const headers = getAuthHeaders();
    const res = await fetch('/api/admin/db/backup', { method: 'POST', headers });
    const data = await res.json();
    if (res.ok) alert(`Backup created: ${data.file}`);
    else alert('Backup failed');
  };

  return (
    <div className="min-h-screen bg-charity-neutral-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Tabasamu Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-charity-orange-600 hover:underline flex items-center gap-1"><Eye className="h-4 w-4" /> View Site</Link>
            <button onClick={() => { localStorage.removeItem('samu_token'); onLogout(); }} className="px-3 py-1.5 rounded-lg bg-charity-neutral-200 hover:bg-charity-neutral-300 flex items-center gap-1"><LogOut className="h-4 w-4" /> Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="flex gap-2 flex-wrap">
          {[["events","Recent Activity"],["contacts","Contacts"],["newsletter","Subscribers"],["volunteers","Volunteers"],["programs","Programs"],["blog","Blog Posts"],["donations","Donations"],["media","Media"]].map((t) => (
            <button key={t[0]} onClick={() => setActiveTab(t[0] as string)} className={`px-3 py-1 rounded ${activeTab===t[0]?"bg-charity-orange-600 text-white":"bg-charity-neutral-100"}`}>{t[1]}</button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <div className="p-4 font-bold border-b">{activeTab.toUpperCase()}</div>
          <div className="p-4">
            {activeTab === 'events' && (
              <div className="max-h-[520px] overflow-auto">
                <table className="w-full text-sm"><thead className="bg-charity-neutral-100"><tr><th className="text-left p-3">Time</th><th className="text-left p-3">Type</th><th className="text-left p-3">Details</th></tr></thead><tbody>{events.map(e => (<tr key={e.id} className="border-b last:border-0"><td className="p-3 whitespace-nowrap">{new Date(e.ts).toLocaleString()}</td><td className="p-3 font-medium">{e.type}</td><td className="p-3"><pre className="whitespace-pre-wrap text-xs text-charity-neutral-600">{JSON.stringify(e.payload,null,2)}</pre></td></tr>))}</tbody></table>
              </div>
            )}

            {activeTab === 'programs' && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">Programs</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setShowProgramForm(s => !s)} className="px-3 py-1 bg-charity-orange-600 text-white rounded">{showProgramForm? 'Close':'New Program'}</button>
                    <button onClick={() => backupDb()} className="px-3 py-1 bg-charity-neutral-200 rounded">Backup DB</button>
                  </div>
                </div>
                {showProgramForm && (
                  <div className="p-4 border rounded mb-4">
                    <input className="w-full mb-2 p-2 border" placeholder="Title" value={newProgram.title} onChange={e => setNewProgram(p => ({...p, title:e.target.value}))} />
                    <input className="w-full mb-2 p-2 border" placeholder="Slug" value={newProgram.slug} onChange={e => setNewProgram(p => ({...p, slug:e.target.value}))} />
                    <input className="w-full mb-2 p-2 border" placeholder="Image URL" value={newProgram.image} onChange={e => setNewProgram(p => ({...p, image:e.target.value}))} />
                    <textarea className="w-full mb-2 p-2 border" placeholder="Summary" value={newProgram.summary} onChange={e => setNewProgram(p => ({...p, summary:e.target.value}))} />
                    <textarea className="w-full mb-2 p-2 border" placeholder="Content" value={newProgram.content} onChange={e => setNewProgram(p => ({...p, content:e.target.value}))} />
                    <div className="flex gap-2"><button onClick={createProgram} className="px-4 py-2 bg-charity-orange-600 text-white rounded">Create</button><button onClick={() => setShowProgramForm(false)} className="px-4 py-2 rounded border">Cancel</button></div>
                  </div>
                )}

                <div className="max-h-[520px] overflow-auto">
                  <table className="w-full text-sm"><thead className="bg-charity-neutral-100"><tr><th className="text-left p-3">Time</th><th className="text-left p-3">Title</th><th className="text-left p-3">Slug</th><th className="p-3">Actions</th></tr></thead><tbody>{programs.map(p => (<tr key={p.id} className="border-b last:border-0"><td className="p-3 whitespace-nowrap">{new Date(p.ts).toLocaleString()}</td><td className="p-3">{p.title}</td><td className="p-3">{p.slug}</td><td className="p-3"><button onClick={() => doDelete(`/api/admin/programs/${p.id}`)} className="text-red-600">Delete</button></td></tr>))}</tbody></table>
                </div>
              </div>
            )}

            {activeTab === 'blog' && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">Blog Posts</h3>
                  <button onClick={() => setShowPostForm(s => !s)} className="px-3 py-1 bg-charity-orange-600 text-white rounded">{showPostForm? 'Close':'New Post'}</button>
                </div>
                {showPostForm && (
                  <div className="p-4 border rounded mb-4">
                    <input className="w-full mb-2 p-2 border" placeholder="Title" value={newPost.title} onChange={e => setNewPost(p => ({...p, title: e.target.value}))} />
                    <input className="w-full mb-2 p-2 border" placeholder="Slug" value={newPost.slug} onChange={e => setNewPost(p => ({...p, slug: e.target.value}))} />
                    <input className="w-full mb-2 p-2 border" placeholder="Cover URL" value={newPost.cover} onChange={e => setNewPost(p => ({...p, cover: e.target.value}))} />
                    <textarea className="w-full mb-2 p-2 border" placeholder="Excerpt" value={newPost.excerpt} onChange={e => setNewPost(p => ({...p, excerpt: e.target.value}))} />
                    <textarea className="w-full mb-2 p-2 border" placeholder="Content" value={newPost.content} onChange={e => setNewPost(p => ({...p, content: e.target.value}))} />
                    <div className="flex gap-2"><button onClick={createPost} className="px-4 py-2 bg-charity-orange-600 text-white rounded">Create</button><button onClick={() => setShowPostForm(false)} className="px-4 py-2 rounded border">Cancel</button></div>
                  </div>
                )}

                <div className="max-h-[520px] overflow-auto">
                  <table className="w-full text-sm"><thead className="bg-charity-neutral-100"><tr><th className="text-left p-3">Time</th><th className="text-left p-3">Title</th><th className="text-left p-3">Slug</th><th className="p-3">Actions</th></tr></thead><tbody>{posts.map(b => (<tr key={b.id} className="border-b last:border-0"><td className="p-3 whitespace-nowrap">{new Date(b.ts).toLocaleString()}</td><td className="p-3">{b.title}</td><td className="p-3">{b.slug}</td><td className="p-3"><button onClick={() => doDelete(`/api/admin/blog/${b.id}`)} className="text-red-600">Delete</button></td></tr>))}</tbody></table>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">Media</h3>
                  <button onClick={() => setShowMediaForm(s => !s)} className="px-3 py-1 bg-charity-orange-600 text-white rounded">{showMediaForm? 'Close':'New Media'}</button>
                </div>
                {showMediaForm && (
                  <div className="p-4 border rounded mb-4">
                    <input className="w-full mb-2 p-2 border" placeholder="Name" value={newMedia.name} onChange={e => setNewMedia(m => ({...m, name: e.target.value}))} />
                    <input className="w-full mb-2 p-2 border" placeholder="URL" value={newMedia.url} onChange={e => setNewMedia(m => ({...m, url: e.target.value}))} />
                    <textarea className="w-full mb-2 p-2 border" placeholder='Meta JSON' value={newMedia.meta} onChange={e => setNewMedia(m => ({...m, meta: e.target.value}))} />
                    <div className="flex gap-2"><button onClick={createMedia} className="px-4 py-2 bg-charity-orange-600 text-white rounded">Create</button><button onClick={() => setShowMediaForm(false)} className="px-4 py-2 rounded border">Cancel</button></div>
                  </div>
                )}

                <div className="max-h-[520px] overflow-auto">
                  <table className="w-full text-sm"><thead className="bg-charity-neutral-100"><tr><th className="text-left p-3">Time</th><th className="text-left p-3">Name</th><th className="text-left p-3">URL</th><th className="p-3">Actions</th></tr></thead><tbody>{media.map(m => (<tr key={m.id} className="border-b last:border-0"><td className="p-3 whitespace-nowrap">{new Date(m.ts).toLocaleString()}</td><td className="p-3">{m.name}</td><td className="p-3">{m.url}</td><td className="p-3"><button onClick={() => doDelete(`/api/admin/media/${m.id}`)} className="text-red-600">Delete</button></td></tr>))}</tbody></table>
                </div>
              </div>
            )}

            {/* fallback sections for contacts, newsletter, volunteers, donations use original listing + delete */}

            {activeTab === 'contacts' && (
              <div className="max-h-[520px] overflow-auto">
                <table className="w-full text-sm"><thead className="bg-charity-neutral-100"><tr><th className="text-left p-3">Time</th><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Message</th><th className="p-3">Actions</th></tr></thead><tbody>{contacts.map(c => (<tr key={c.id} className="border-b last:border-0"><td className="p-3 whitespace-nowrap">{new Date(c.ts).toLocaleString()}</td><td className="p-3">{c.name}</td><td className="p-3">{c.email}</td><td className="p-3">{c.message}</td><td className="p-3"><button onClick={() => doDelete(`/api/admin/contacts/${c.id}`)} className="text-red-600">Delete</button></td></tr>))}</tbody></table>
              </div>
            )}

            {activeTab === 'newsletter' && (
              <div className="max-h-[520px] overflow-auto">
                <table className="w-full text-sm"><thead className="bg-charity-neutral-100"><tr><th className="text-left p-3">Time</th><th className="text-left p-3">Email</th><th className="text-left p-3">Name</th><th className="p-3">Actions</th></tr></thead><tbody>{subscribers.map(s => (<tr key={s.id} className="border-b last:border-0"><td className="p-3 whitespace-nowrap">{new Date(s.ts).toLocaleString()}</td><td className="p-3">{s.email}</td><td className="p-3">{s.name}</td><td className="p-3"><button onClick={() => doDelete(`/api/admin/newsletter/${s.id}`)} className="text-red-600">Delete</button></td></tr>))}</tbody></table>
              </div>
            )}

            {activeTab === 'volunteers' && (
              <div className="max-h-[520px] overflow-auto">
                <table className="w-full text-sm"><thead className="bg-charity-neutral-100"><tr><th className="text-left p-3">Time</th><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Details</th><th className="p-3">Actions</th></tr></thead><tbody>{volunteers.map(v => (<tr key={v.id} className="border-b last:border-0"><td className="p-3 whitespace-nowrap">{new Date(v.ts).toLocaleString()}</td><td className="p-3">{v.name}</td><td className="p-3">{v.email}</td><td className="p-3">{v.details}</td><td className="p-3"><button onClick={() => doDelete(`/api/admin/volunteers/${v.id}`)} className="text-red-600">Delete</button></td></tr>))}</tbody></table>
              </div>
            )}

            {activeTab === 'donations' && (
              <div className="max-h-[520px] overflow-auto">
                <table className="w-full text-sm"><thead className="bg-charity-neutral-100"><tr><th className="text-left p-3">Time</th><th className="text-left p-3">Donor</th><th className="text-left p-3">Amount</th><th className="p-3">Actions</th></tr></thead><tbody>{donations.map(d => (<tr key={d.id} className="border-b last:border-0"><td className="p-3 whitespace-nowrap">{new Date(d.ts).toLocaleString()}</td><td className="p-3">{d.donor_name}</td><td className="p-3">{d.amount} {d.currency}</td><td className="p-3"><button onClick={() => doDelete(`/api/admin/donations/${d.id}`)} className="text-red-600">Delete</button></td></tr>))}</tbody></table>
              </div>
            )}

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
