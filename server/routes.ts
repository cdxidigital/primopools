import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertCustomerSchema, 
  insertProjectSchema,
  insertProjectUpdateSchema,
  insertProjectDocumentSchema,
  insertProjectMessageSchema
} from "@shared/schema";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { seedTestData } from "./seedData";
import { simpleSalesBot, type ChatMessage } from "./simpleSalesBot";

// JWT secret - in production this should be an environment variable
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

// Middleware for customer authentication
const authenticateCustomer = async (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const customer = await storage.getCustomer(decoded.customerId);
    
    if (!customer || !customer.isActive) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.customer = customer;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Create contact in storage
      const contact = await storage.createContact(validatedData);
      
      // In a real application, you would also:
      // 1. Send email notification to business
      // 2. Send confirmation email to customer
      // 3. Integrate with CRM system
      
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        contactId: contact.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contacts" 
      });
    }
  });

  // Get specific contact
  app.get("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contact = await storage.getContact(id);
      
      if (!contact) {
        res.status(404).json({ 
          success: false, 
          message: "Contact not found" 
        });
        return;
      }
      
      res.json(contact);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to retrieve contact" 
      });
    }
  });

  // Customer Portal Authentication Routes

  // Customer registration
  app.post("/api/customer/register", async (req, res) => {
    try {
      const validatedData = insertCustomerSchema.parse(req.body);
      
      // Check if customer already exists
      const existingCustomer = await storage.getCustomerByEmail(validatedData.email);
      if (existingCustomer) {
        return res.status(400).json({
          success: false,
          message: "Customer already exists with this email"
        });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds);
      
      // Create customer
      const customer = await storage.createCustomer({
        ...validatedData,
        password: hashedPassword
      });

      // Generate JWT token
      const token = jwt.sign(
        { customerId: customer.id, email: customer.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Customer registered successfully",
        token,
        customer: {
          id: customer.id,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid registration data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Registration failed"
        });
      }
    }
  });

  // Customer login
  app.post("/api/customer/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required"
        });
      }

      // Find customer
      const customer = await storage.getCustomerByEmail(email);
      if (!customer || !customer.isActive) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, customer.password);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { customerId: customer.id, email: customer.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Login successful",
        token,
        customer: {
          id: customer.id,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Login failed"
      });
    }
  });

  // Customer profile routes
  app.get("/api/customer/profile", authenticateCustomer, async (req: any, res) => {
    try {
      const { customer } = req;
      res.json({
        success: true,
        customer: {
          id: customer.id,
          email: customer.email,
          firstName: customer.firstName,
          lastName: customer.lastName,
          phone: customer.phone,
          address: customer.address,
          suburb: customer.suburb,
          postcode: customer.postcode
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch profile"
      });
    }
  });

  app.put("/api/customer/profile", authenticateCustomer, async (req: any, res) => {
    try {
      const { customer } = req;
      const updateData = req.body;
      
      // Remove sensitive fields
      delete updateData.id;
      delete updateData.password;
      delete updateData.isActive;
      delete updateData.createdAt;
      delete updateData.updatedAt;

      const updatedCustomer = await storage.updateCustomer(customer.id, updateData);
      
      res.json({
        success: true,
        message: "Profile updated successfully",
        customer: {
          id: updatedCustomer.id,
          email: updatedCustomer.email,
          firstName: updatedCustomer.firstName,
          lastName: updatedCustomer.lastName,
          phone: updatedCustomer.phone,
          address: updatedCustomer.address,
          suburb: updatedCustomer.suburb,
          postcode: updatedCustomer.postcode
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update profile"
      });
    }
  });

  // Project routes
  app.get("/api/customer/projects", authenticateCustomer, async (req: any, res) => {
    try {
      const { customer } = req;
      const projects = await storage.getProjectsByCustomer(customer.id);
      res.json({
        success: true,
        projects
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch projects"
      });
    }
  });

  app.get("/api/customer/projects/:id", authenticateCustomer, async (req: any, res) => {
    try {
      const { customer } = req;
      const projectId = parseInt(req.params.id);
      
      const project = await storage.getProject(projectId);
      if (!project || project.customerId !== customer.id) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      res.json({
        success: true,
        project
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch project"
      });
    }
  });

  // Project updates
  app.get("/api/customer/projects/:id/updates", authenticateCustomer, async (req: any, res) => {
    try {
      const { customer } = req;
      const projectId = parseInt(req.params.id);
      
      // Verify project belongs to customer
      const project = await storage.getProject(projectId);
      if (!project || project.customerId !== customer.id) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      const updates = await storage.getProjectUpdates(projectId);
      res.json({
        success: true,
        updates
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch project updates"
      });
    }
  });

  // Project documents
  app.get("/api/customer/projects/:id/documents", authenticateCustomer, async (req: any, res) => {
    try {
      const { customer } = req;
      const projectId = parseInt(req.params.id);
      
      // Verify project belongs to customer
      const project = await storage.getProject(projectId);
      if (!project || project.customerId !== customer.id) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      const documents = await storage.getProjectDocuments(projectId);
      res.json({
        success: true,
        documents
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch project documents"
      });
    }
  });

  // Project messages
  app.get("/api/customer/projects/:id/messages", authenticateCustomer, async (req: any, res) => {
    try {
      const { customer } = req;
      const projectId = parseInt(req.params.id);
      
      // Verify project belongs to customer
      const project = await storage.getProject(projectId);
      if (!project || project.customerId !== customer.id) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      const messages = await storage.getProjectMessages(projectId);
      
      // Mark customer messages as read
      await storage.markMessagesAsRead(projectId, customer.id);
      
      res.json({
        success: true,
        messages
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch project messages"
      });
    }
  });

  app.post("/api/customer/projects/:id/messages", authenticateCustomer, async (req: any, res) => {
    try {
      const { customer } = req;
      const projectId = parseInt(req.params.id);
      const { message } = req.body;

      if (!message || message.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Message content is required"
        });
      }
      
      // Verify project belongs to customer
      const project = await storage.getProject(projectId);
      if (!project || project.customerId !== customer.id) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      const newMessage = await storage.createProjectMessage({
        projectId,
        senderId: customer.id,
        senderName: `${customer.firstName} ${customer.lastName}`,
        senderType: "customer",
        message: message.trim()
      });

      res.json({
        success: true,
        message: "Message sent successfully",
        messageData: newMessage
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to send message"
      });
    }
  });

  // AI Sales Bot endpoints
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({
          success: false,
          message: "Invalid messages format"
        });
      }

      const response = simpleSalesBot.generateResponse(messages);
      
      res.json({
        success: true,
        response
      });
    } catch (error) {
      console.error("AI chat error:", error);
      
      // Fallback response when AI is unavailable
      const userMessage = req.body.messages?.[req.body.messages.length - 1]?.content?.toLowerCase() || "";
      let fallbackResponse = "I'm here to help you with your pool project! While our AI system is currently updating, I can still provide information about Primo Pools' services. What would you like to know about pool construction, renovations, or maintenance?";
      
      if (userMessage.includes("build") || userMessage.includes("new pool")) {
        fallbackResponse = "I'd love to help you with your new pool project! Primo Pools specializes in luxury concrete pools, infinity edge designs, and custom water features. Would you like to schedule a complimentary consultation to discuss your vision?";
      } else if (userMessage.includes("price") || userMessage.includes("cost")) {
        fallbackResponse = "Pool costs vary based on size, features, and design complexity. We provide accurate pricing through our complimentary consultation process where our team visits your property and provides a detailed quote tailored to your project.";
      }
      
      res.json({
        success: true,
        response: fallbackResponse
      });
    }
  });

  app.post("/api/analyze-lead", async (req, res) => {
    try {
      const { conversation } = req.body;
      
      if (!conversation || !Array.isArray(conversation)) {
        return res.status(400).json({
          success: false,
          message: "Invalid conversation format"
        });
      }

      // Simple lead analysis fallback
      const analysis = {
        score: 7,
        interest_level: "medium",
        project_type: "pool_construction",
        urgency: "medium",
        budget_indication: "unknown"
      };
      
      res.json({
        success: true,
        analysis
      });
    } catch (error) {
      console.error("Lead analysis error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to analyze lead"
      });
    }
  });

  // Seed test data endpoint (for development)
  app.post("/api/seed-test-data", async (req, res) => {
    try {
      await seedTestData();
      res.json({ 
        success: true, 
        message: "Test data created successfully",
        accounts: [
          { email: "john.smith@example.com", password: "password123" },
          { email: "sarah.jones@example.com", password: "password123" }
        ]
      });
    } catch (error) {
      console.error("Error seeding test data:", error);
      res.status(500).json({ success: false, message: "Failed to create test data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
