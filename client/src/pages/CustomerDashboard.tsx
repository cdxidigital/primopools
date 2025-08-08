import { useState, useEffect } from "react";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileText, MessageSquare, User, LogOut, Clock, CheckCircle } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  projectType: string;
  status: string;
  budget: string;
  progressPercentage: number;
  estimatedStartDate: string;
  estimatedEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectUpdate {
  id: number;
  projectId: number;
  title: string;
  description: string;
  updateType: string;
  progressPercentage?: number;
  images?: string;
  createdAt: string;
}

interface ProjectMessage {
  id: number;
  projectId: number;
  senderName: string;
  senderType: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function CustomerDashboard() {
  const { customer, token, logout } = useCustomerAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectUpdates, setProjectUpdates] = useState<ProjectUpdate[]>([]);
  const [projectMessages, setProjectMessages] = useState<ProjectMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchProjects();
    }
  }, [token]);

  useEffect(() => {
    if (selectedProject && token) {
      fetchProjectUpdates(selectedProject.id);
      fetchProjectMessages(selectedProject.id);
    }
  }, [selectedProject, token]);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/customer/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.success) {
        setProjects(data.projects);
        if (data.projects.length > 0) {
          setSelectedProject(data.projects[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjectUpdates = async (projectId: number) => {
    try {
      const response = await fetch(`/api/customer/projects/${projectId}/updates`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.success) {
        setProjectUpdates(data.updates);
      }
    } catch (error) {
      console.error("Failed to fetch project updates:", error);
    }
  };

  const fetchProjectMessages = async (projectId: number) => {
    try {
      const response = await fetch(`/api/customer/projects/${projectId}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.success) {
        setProjectMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to fetch project messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedProject) return;

    try {
      const response = await fetch(`/api/customer/projects/${selectedProject.id}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: newMessage })
      });

      const data = await response.json();
      if (data.success) {
        setNewMessage("");
        fetchProjectMessages(selectedProject.id);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-500";
      case "design": return "bg-purple-500";
      case "permits": return "bg-yellow-500";
      case "construction": return "bg-orange-500";
      case "finishing": return "bg-green-500";
      case "completed": return "bg-emerald-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-blue via-turquoise/10 to-quartz-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-turquoise mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-blue via-turquoise/10 to-quartz-white">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-cabinet font-bold text-deep-blue">
              Welcome, {customer?.firstName}
            </h1>
            <p className="text-gray-600">Track your pool project progress</p>
          </div>
          <Button
            variant="outline"
            onClick={logout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {projects.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">No Projects Yet</h2>
              <p className="text-gray-600">
                Your projects will appear here once they are created by our team.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Projects Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Your Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedProject?.id === project.id
                          ? "bg-turquoise/10 border-turquoise"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-sm">{project.title}</h3>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <Progress value={project.progressPercentage} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">
                        {project.progressPercentage}% Complete
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {selectedProject && (
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="updates">Updates</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview">
                    <Card>
                      <CardHeader>
                        <CardTitle>{selectedProject.title}</CardTitle>
                        <CardDescription>{selectedProject.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-gray-500">
                              {selectedProject.progressPercentage}%
                            </span>
                          </div>
                          <Progress value={selectedProject.progressPercentage} className="h-3" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Project Type</label>
                              <p className="capitalize">{selectedProject.projectType.replace("-", " ")}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Status</label>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(selectedProject.status)}>
                                  {selectedProject.status}
                                </Badge>
                              </div>
                            </div>
                            {selectedProject.budget && (
                              <div>
                                <label className="text-sm font-medium text-gray-500">Budget</label>
                                <p>${parseFloat(selectedProject.budget).toLocaleString()}</p>
                              </div>
                            )}
                          </div>
                          <div className="space-y-3">
                            {selectedProject.estimatedStartDate && (
                              <div>
                                <label className="text-sm font-medium text-gray-500">Estimated Start</label>
                                <p>{formatDate(selectedProject.estimatedStartDate)}</p>
                              </div>
                            )}
                            {selectedProject.estimatedEndDate && (
                              <div>
                                <label className="text-sm font-medium text-gray-500">Estimated Completion</label>
                                <p>{formatDate(selectedProject.estimatedEndDate)}</p>
                              </div>
                            )}
                            {selectedProject.actualStartDate && (
                              <div>
                                <label className="text-sm font-medium text-gray-500">Actual Start</label>
                                <p>{formatDate(selectedProject.actualStartDate)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="updates">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Updates</CardTitle>
                        <CardDescription>
                          Latest progress updates from our team
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {projectUpdates.length === 0 ? (
                          <p className="text-center text-gray-500 py-8">
                            No updates available yet.
                          </p>
                        ) : (
                          <div className="space-y-4">
                            {projectUpdates.map((update) => (
                              <div key={update.id} className="border-l-4 border-turquoise pl-4 pb-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold">{update.title}</h3>
                                  <Badge variant="outline" className="text-xs">
                                    {update.updateType}
                                  </Badge>
                                </div>
                                <p className="text-gray-600 mb-2">{update.description}</p>
                                {update.progressPercentage !== null && (
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <CheckCircle className="h-4 w-4" />
                                    Progress: {update.progressPercentage}%
                                  </div>
                                )}
                                <p className="text-xs text-gray-400 mt-2">
                                  {formatDate(update.createdAt)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="messages">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Communication</CardTitle>
                        <CardDescription>
                          Communicate directly with our project team
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                          {projectMessages.map((message) => (
                            <div
                              key={message.id}
                              className={`p-3 rounded-lg ${
                                message.senderType === "customer"
                                  ? "bg-turquoise/10 ml-8"
                                  : "bg-gray-50 mr-8"
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-sm">{message.senderName}</span>
                                <span className="text-xs text-gray-500">
                                  {formatDate(message.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm">{message.message}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-turquoise"
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          />
                          <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}