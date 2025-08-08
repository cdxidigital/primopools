import { storage } from "./storage";
import bcrypt from "bcrypt";

export async function seedTestData() {
  try {
    // Create test customers
    const customer1 = await storage.createCustomer({
      email: "john.smith@example.com",
      firstName: "John",
      lastName: "Smith",
      phone: "08 9123 4567",
      address: "123 Ocean Drive",
      suburb: "Cottesloe",
      postcode: "6011",
      password: await bcrypt.hash("password123", 10)
    });

    const customer2 = await storage.createCustomer({
      email: "sarah.jones@example.com",
      firstName: "Sarah",
      lastName: "Jones",
      phone: "08 9876 5432",
      address: "456 Beach Road",
      suburb: "Scarborough",
      postcode: "6019",
      password: await bcrypt.hash("password123", 10)
    });

    // Create test projects for customer 1
    const project1 = await storage.createProject({
      customerId: customer1.id,
      title: "Luxury Resort-Style Pool",
      description: "Large family pool with spa, water features, and outdoor entertainment area. Includes infinity edge and integrated lighting system.",
      projectType: "new-construction",
      status: "construction",
      budget: "85000.00",
      progressPercentage: 65,
      estimatedStartDate: new Date("2024-11-15"),
      estimatedEndDate: new Date("2025-02-28"),
      actualStartDate: new Date("2024-11-20")
    });

    const project2 = await storage.createProject({
      customerId: customer1.id,
      title: "Pool Equipment Upgrade",
      description: "Upgrade to energy-efficient pump and heating system with automated chlorination.",
      projectType: "renovation",
      status: "completed",
      budget: "12500.00",
      progressPercentage: 100,
      estimatedStartDate: new Date("2024-10-01"),
      estimatedEndDate: new Date("2024-10-15"),
      actualStartDate: new Date("2024-10-02"),
      actualEndDate: new Date("2024-10-14")
    });

    // Create test project for customer 2
    const project3 = await storage.createProject({
      customerId: customer2.id,
      title: "Modern Lap Pool Design",
      description: "25-meter lap pool with contemporary design, automatic cover, and LED strip lighting.",
      projectType: "new-construction",
      status: "design",
      budget: "75000.00",
      progressPercentage: 25,
      estimatedStartDate: new Date("2025-01-15"),
      estimatedEndDate: new Date("2025-04-30")
    });

    // Create project updates
    await storage.createProjectUpdate({
      projectId: project1.id,
      title: "Pool Shell Completed",
      description: "Concrete shell has been poured and is now curing. Next phase will begin excavation for spa area.",
      updateType: "milestone",
      progressPercentage: 65
    });

    await storage.createProjectUpdate({
      projectId: project1.id,
      title: "Plumbing Installation Progress",
      description: "Main drain and return lines installed. Spa jets and lighting conduits in progress.",
      updateType: "progress",
      progressPercentage: 55
    });

    await storage.createProjectUpdate({
      projectId: project2.id,
      title: "Project Completed Successfully",
      description: "All equipment installed and tested. System is running efficiently with 30% energy savings.",
      updateType: "completion",
      progressPercentage: 100
    });

    await storage.createProjectUpdate({
      projectId: project3.id,
      title: "Design Phase Underway",
      description: "Initial site survey completed. 3D renderings and engineering drawings in development.",
      updateType: "planning",
      progressPercentage: 25
    });

    // Create project messages
    await storage.createProjectMessage({
      projectId: project1.id,
      senderName: "Mike Thompson",
      senderType: "team",
      message: "Hi John! The pool shell looks fantastic. We're on track to start the spa excavation next week. Any questions about the progress so far?"
    });

    await storage.createProjectMessage({
      projectId: project1.id,
      senderName: "John Smith",
      senderType: "customer",
      message: "Thanks Mike! Everything looks great. When do you think the lighting installation will begin?"
    });

    await storage.createProjectMessage({
      projectId: project1.id,
      senderName: "Mike Thompson",
      senderType: "team",
      message: "The lighting installation is scheduled for week 3 of January, right after the plumbing is finalized. We'll keep you updated!"
    });

    await storage.createProjectMessage({
      projectId: project3.id,
      senderName: "Emma Wilson",
      senderType: "team",
      message: "Hi Sarah! Your design concepts look amazing. We've incorporated all your feedback into the latest 3D renderings. Would you like to schedule a review meeting?"
    });

    await storage.createProjectMessage({
      projectId: project3.id,
      senderName: "Sarah Jones",
      senderType: "customer",
      message: "That sounds perfect! I'm available next Tuesday or Wednesday afternoon. Looking forward to seeing the updated designs."
    });

    console.log("✓ Test data seeded successfully!");
    console.log("Test Accounts:");
    console.log("- john.smith@example.com / password123");
    console.log("- sarah.jones@example.com / password123");
    
  } catch (error) {
    console.error("Error seeding test data:", error);
  }
}