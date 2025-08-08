import { 
  users, 
  contacts, 
  customers,
  projects,
  projectUpdates,
  projectDocuments,
  projectMessages,
  type User, 
  type InsertUser, 
  type Contact, 
  type InsertContact,
  type Customer,
  type InsertCustomer,
  type Project,
  type InsertProject,
  type ProjectUpdate,
  type InsertProjectUpdate,
  type ProjectDocument,
  type InsertProjectDocument,
  type ProjectMessage,
  type InsertProjectMessage
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, SQL } from "drizzle-orm";

export interface IStorage {
  // User methods (existing)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;

  // Customer methods
  getCustomer(id: number): Promise<Customer | undefined>;
  getCustomerByEmail(email: string): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: number, customer: Partial<InsertCustomer>): Promise<Customer>;

  // Project methods
  getProject(id: number): Promise<Project | undefined>;
  getProjectsByCustomer(customerId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;

  // Project update methods
  getProjectUpdates(projectId: number): Promise<ProjectUpdate[]>;
  createProjectUpdate(update: InsertProjectUpdate): Promise<ProjectUpdate>;

  // Project document methods
  getProjectDocuments(projectId: number): Promise<ProjectDocument[]>;
  createProjectDocument(document: InsertProjectDocument): Promise<ProjectDocument>;

  // Project message methods
  getProjectMessages(projectId: number): Promise<ProjectMessage[]>;
  createProjectMessage(message: InsertProjectMessage): Promise<ProjectMessage>;
  markMessagesAsRead(projectId: number, senderId?: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db
      .select()
      .from(contacts)
      .orderBy(contacts.createdAt);
  }

  async getContact(id: number): Promise<Contact | undefined> {
    const [contact] = await db.select().from(contacts).where(eq(contacts.id, id));
    return contact || undefined;
  }

  // Customer methods
  async getCustomer(id: number): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.id, id));
    return customer || undefined;
  }

  async getCustomerByEmail(email: string): Promise<Customer | undefined> {
    const [customer] = await db.select().from(customers).where(eq(customers.email, email));
    return customer || undefined;
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const [customer] = await db
      .insert(customers)
      .values(insertCustomer)
      .returning();
    return customer;
  }

  async updateCustomer(id: number, updateData: Partial<InsertCustomer>): Promise<Customer> {
    const [customer] = await db
      .update(customers)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(customers.id, id))
      .returning();
    return customer;
  }

  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async getProjectsByCustomer(customerId: number): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.customerId, customerId))
      .orderBy(desc(projects.createdAt));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  // Project update methods
  async getProjectUpdates(projectId: number): Promise<ProjectUpdate[]> {
    return await db
      .select()
      .from(projectUpdates)
      .where(eq(projectUpdates.projectId, projectId))
      .orderBy(desc(projectUpdates.createdAt));
  }

  async createProjectUpdate(insertUpdate: InsertProjectUpdate): Promise<ProjectUpdate> {
    const [update] = await db
      .insert(projectUpdates)
      .values(insertUpdate)
      .returning();
    return update;
  }

  // Project document methods
  async getProjectDocuments(projectId: number): Promise<ProjectDocument[]> {
    return await db
      .select()
      .from(projectDocuments)
      .where(eq(projectDocuments.projectId, projectId))
      .orderBy(desc(projectDocuments.uploadedAt));
  }

  async createProjectDocument(insertDocument: InsertProjectDocument): Promise<ProjectDocument> {
    const [document] = await db
      .insert(projectDocuments)
      .values(insertDocument)
      .returning();
    return document;
  }

  // Project message methods
  async getProjectMessages(projectId: number): Promise<ProjectMessage[]> {
    return await db
      .select()
      .from(projectMessages)
      .where(eq(projectMessages.projectId, projectId))
      .orderBy(projectMessages.createdAt);
  }

  async createProjectMessage(insertMessage: InsertProjectMessage): Promise<ProjectMessage> {
    const [message] = await db
      .insert(projectMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async markMessagesAsRead(projectId: number, senderId?: number): Promise<void> {
    if (senderId !== undefined) {
      await db
        .update(projectMessages)
        .set({ isRead: true })
        .where(and(
          eq(projectMessages.projectId, projectId),
          eq(projectMessages.senderId, senderId)
        )!);
    } else {
      await db
        .update(projectMessages)
        .set({ isRead: true })
        .where(eq(projectMessages.projectId, projectId));
    }
  }
}

export const storage = new DatabaseStorage();
