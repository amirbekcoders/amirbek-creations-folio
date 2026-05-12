import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Trash2, Pencil, LogOut } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  tags: string[] | null;
  order_index: number;
};

type Technology = {
  id: string;
  name: string;
  icon: string | null;
  category: string | null;
  order_index: number;
};

const emptyProject: Omit<Project, "id"> = {
  title: "",
  description: "",
  image_url: "",
  demo_url: "",
  github_url: "",
  tags: [],
  order_index: 0,
};

const emptyTech: Omit<Technology, "id"> = {
  name: "",
  icon: "",
  category: "",
  order_index: 0,
};

const Admin = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Omit<Project, "id">>(emptyProject);
  const [tagInput, setTagInput] = useState("");

  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [techForm, setTechForm] = useState<Omit<Technology, "id">>(emptyTech);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUserId(session.user.id);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      const admin = (roles ?? []).some((r) => r.role === "admin");
      setIsAdmin(admin);
      setChecking(false);
      if (admin) {
        loadProjects();
        loadTechnologies();
      }
    })();
  }, [navigate]);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else setProjects(data ?? []);
  };

  const loadTechnologies = async () => {
    const { data, error } = await supabase
      .from("technologies")
      .select("*")
      .order("order_index", { ascending: true });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else setTechnologies(data ?? []);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const startEditProject = (p: Project | null) => {
    setEditingProject(p);
    setProjectForm(p ? { ...p } : emptyProject);
    setTagInput("");
  };

  const saveProject = async () => {
    const payload = { ...projectForm, tags: projectForm.tags ?? [] };
    if (editingProject) {
      const { error } = await supabase.from("projects").update(payload).eq("id", editingProject.id);
      if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
      toast({ title: "Project updated" });
    } else {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
      toast({ title: "Project added" });
    }
    setEditingProject(null);
    setProjectForm(emptyProject);
    loadProjects();
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    loadProjects();
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setProjectForm({ ...projectForm, tags: [...(projectForm.tags ?? []), tagInput.trim()] });
    setTagInput("");
  };
  const removeTag = (i: number) =>
    setProjectForm({ ...projectForm, tags: (projectForm.tags ?? []).filter((_, idx) => idx !== i) });

  const startEditTech = (t: Technology | null) => {
    setEditingTech(t);
    setTechForm(t ? { ...t } : emptyTech);
  };
  const saveTech = async () => {
    if (editingTech) {
      const { error } = await supabase.from("technologies").update(techForm).eq("id", editingTech.id);
      if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
      toast({ title: "Technology updated" });
    } else {
      const { error } = await supabase.from("technologies").insert(techForm);
      if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
      toast({ title: "Technology added" });
    }
    setEditingTech(null);
    setTechForm(emptyTech);
    loadTechnologies();
  };
  const deleteTech = async (id: string) => {
    if (!confirm("Delete this technology?")) return;
    const { error } = await supabase.from("technologies").delete().eq("id", id);
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    loadTechnologies();
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="p-8 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Access denied</h1>
          <p className="text-muted-foreground mb-4">
            Your account doesn't have admin permissions yet. Share this user ID with the site owner so they can grant access:
          </p>
          <code className="block p-2 bg-muted rounded text-xs break-all mb-4">{userId}</code>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => navigate("/")}>Back to site</Button>
            <Button onClick={handleSignOut}>Sign out</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 5px 0" }}>Admin Panel</h1>
            <p style={{ color: "#666", margin: "0" }}>Manage your portfolio content</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="outline" onClick={() => navigate("/")}>View site</Button>
            <Button variant="outline" onClick={handleSignOut}>Sign out</Button>
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>Projects ({projects.length})</h2>
          
          <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
            <h3 style={{ marginTop: "0", marginBottom: "15px" }}>{editingProject ? "Edit project" : "Add project"}</h3>
            <div style={{ marginBottom: "10px" }}>
              <Label>Title</Label>
              <Input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Label>Description</Label>
              <Textarea value={projectForm.description ?? ""} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Label>Image URL</Label>
              <Input value={projectForm.image_url ?? ""} onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Label>Demo URL</Label>
              <Input value={projectForm.demo_url ?? ""} onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Label>GitHub URL</Label>
              <Input value={projectForm.github_url ?? ""} onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Label>Tags</Label>
              <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Press Enter" />
                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {(projectForm.tags ?? []).map((t, i) => (
                  <span key={i} style={{ padding: "4px 8px", backgroundColor: "#e0e0e0", borderRadius: "15px", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" }}>
                    {t}
                    <button onClick={() => removeTag(i)} style={{ background: "none", border: "none", cursor: "pointer" }}>✕</button>
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Label>Order</Label>
              <Input type="number" value={projectForm.order_index} onChange={(e) => setProjectForm({ ...projectForm, order_index: Number(e.target.value) })} />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button onClick={saveProject}>
                {editingProject ? "Update" : "Add project"}
              </Button>
              {editingProject && <Button variant="outline" onClick={() => startEditProject(null)}>Cancel</Button>}
            </div>
          </div>

          {projects.map((p) => (
            <div key={p.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: "bold" }}>{p.title}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>{p.description}</div>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button size="icon" variant="ghost" onClick={() => startEditProject(p)}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => deleteProject(p.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p style={{ textAlign: "center", color: "#999" }}>No projects yet.</p>}
        </div>

        <div>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>Technologies ({technologies.length})</h2>
          
          <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
            <h3 style={{ marginTop: "0", marginBottom: "15px" }}>{editingTech ? "Edit technology" : "Add technology"}</h3>
            <div style={{ marginBottom: "10px" }}>
              <Label>Name</Label>
              <Input value={techForm.name} onChange={(e) => setTechForm({ ...techForm, name: e.target.value })} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Label>Category</Label>
              <Input value={techForm.category ?? ""} onChange={(e) => setTechForm({ ...techForm, category: e.target.value })} placeholder="e.g. Frontend" />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Label>Icon (emoji or URL)</Label>
              <Input value={techForm.icon ?? ""} onChange={(e) => setTechForm({ ...techForm, icon: e.target.value })} />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <Label>Order</Label>
              <Input type="number" value={techForm.order_index} onChange={(e) => setTechForm({ ...techForm, order_index: Number(e.target.value) })} />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button onClick={saveTech}>
                {editingTech ? "Update" : "Add technology"}
              </Button>
              {editingTech && <Button variant="outline" onClick={() => startEditTech(null)}>Cancel</Button>}
            </div>
          </div>

          {technologies.map((t) => (
            <div key={t.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: "bold" }}>{t.icon} {t.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>{t.category}</div>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <Button size="icon" variant="ghost" onClick={() => startEditTech(t)}><Pencil className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => deleteTech(t.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          {technologies.length === 0 && <p style={{ textAlign: "center", color: "#999" }}>No technologies yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default Admin;
