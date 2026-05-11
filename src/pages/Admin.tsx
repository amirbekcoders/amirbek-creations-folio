import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Trash2, Pencil, Plus, LogOut, X } from "lucide-react";

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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage your portfolio content</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate("/")}>View site</Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="projects">
          <TabsList>
            <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
            <TabsTrigger value="technologies">Technologies ({technologies.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <Card className="p-6">
              <h2 className="font-semibold mb-4">{editingProject ? "Edit project" : "Add project"}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <Input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                </div>
                <div>
                  <Label>Order</Label>
                  <Input type="number" value={projectForm.order_index} onChange={(e) => setProjectForm({ ...projectForm, order_index: Number(e.target.value) })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea value={projectForm.description ?? ""} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input value={projectForm.image_url ?? ""} onChange={(e) => setProjectForm({ ...projectForm, image_url: e.target.value })} />
                </div>
                <div>
                  <Label>Demo URL</Label>
                  <Input value={projectForm.demo_url ?? ""} onChange={(e) => setProjectForm({ ...projectForm, demo_url: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label>GitHub URL</Label>
                  <Input value={projectForm.github_url ?? ""} onChange={(e) => setProjectForm({ ...projectForm, github_url: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Press Enter" />
                    <Button type="button" variant="outline" onClick={addTag}>Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(projectForm.tags ?? []).map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs flex items-center gap-1">
                        {t}
                        <button onClick={() => removeTag(i)}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={saveProject}>
                  {editingProject ? "Update" : <><Plus className="w-4 h-4 mr-2" />Add project</>}
                </Button>
                {editingProject && <Button variant="outline" onClick={() => startEditProject(null)}>Cancel</Button>}
              </div>
            </Card>

            <div className="space-y-3">
              {projects.map((p) => (
                <Card key={p.id} className="p-4 flex items-center gap-4">
                  {p.image_url && <img src={p.image_url} alt={p.title} className="w-20 h-14 object-cover rounded" />}
                  <div className="flex-1">
                    <div className="font-semibold">{p.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{p.description}</div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => startEditProject(p)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteProject(p.id)}><Trash2 className="w-4 h-4" /></Button>
                </Card>
              ))}
              {projects.length === 0 && <p className="text-center text-muted-foreground py-8">No projects yet.</p>}
            </div>
          </TabsContent>

          <TabsContent value="technologies" className="space-y-4">
            <Card className="p-6">
              <h2 className="font-semibold mb-4">{editingTech ? "Edit technology" : "Add technology"}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input value={techForm.name} onChange={(e) => setTechForm({ ...techForm, name: e.target.value })} />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={techForm.category ?? ""} onChange={(e) => setTechForm({ ...techForm, category: e.target.value })} placeholder="e.g. Frontend" />
                </div>
                <div>
                  <Label>Icon (emoji or URL)</Label>
                  <Input value={techForm.icon ?? ""} onChange={(e) => setTechForm({ ...techForm, icon: e.target.value })} />
                </div>
                <div>
                  <Label>Order</Label>
                  <Input type="number" value={techForm.order_index} onChange={(e) => setTechForm({ ...techForm, order_index: Number(e.target.value) })} />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={saveTech}>
                  {editingTech ? "Update" : <><Plus className="w-4 h-4 mr-2" />Add technology</>}
                </Button>
                {editingTech && <Button variant="outline" onClick={() => startEditTech(null)}>Cancel</Button>}
              </div>
            </Card>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {technologies.map((t) => (
                <Card key={t.id} className="p-4 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-semibold">{t.icon} {t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.category}</div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => startEditTech(t)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteTech(t.id)}><Trash2 className="w-4 h-4" /></Button>
                </Card>
              ))}
              {technologies.length === 0 && <p className="col-span-full text-center text-muted-foreground py-8">No technologies yet.</p>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
