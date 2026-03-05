import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

// ── Types ──────────────────────────────────────────────────────────────────

export interface Site {
  id: string;
  name: string;
  location: string;
  manager: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  pin: string;
  role: string;
  siteId: string;
  status: string;
  email: string;
}

export interface ShowerThought {
  id: string;
  text: string;
  anonymous: boolean;
  authorUsername: string;
  authorName: string;
  siteId: string;
  createdAt: any;
}

export interface PulseResponse {
  id?: string;
  authorUsername: string;
  siteId: string;
  nps: number;
  workload: number;
  leadership: number;
  createdAt: any;
}

export interface FeedbackRequest {
  id?: string;
  fromUsername: string;
  toName: string;
  surveyType: string;
  status: "pending" | "completed";
  createdAt: any;
}

// ── Seed Data ──────────────────────────────────────────────────────────────

const SEED_SITES: Omit<Site, "id">[] = [
  { name: "Downtown Bakery", location: "123 Main St", manager: "Jack Thompson" },
  { name: "Northside Cafe", location: "456 High St", manager: "Sarah Miller" },
  { name: "East End Pastries", location: "789 Park Rd", manager: "Tristen B." },
];

const SEED_USERS = [
  { name: "Tristen Bayley", username: "tristenb", pin: "000000", role: "Super Admin", status: "Active", email: "tristen@provr.com", siteName: "East End Pastries" },
  { name: "Sarah Miller", username: "sarahm", pin: "123456", role: "Bakery Manager", status: "Active", email: "sarah@provr.com", siteName: "Northside Cafe" },
  { name: "Alex Baker", username: "alexb", pin: "111111", role: "Barista", status: "Active", email: "alex@provr.com", siteName: "Downtown Bakery" },
  { name: "Jack Thompson", username: "jackt", pin: "222222", role: "Bakery Manager", status: "Inactive", email: "jack@provr.com", siteName: "Downtown Bakery" },
];

const SEED_SHOWER_THOUGHTS = [
  "The coffee machine on the left is acting up again, might need a service.",
  "Everyone is doing so well with the new autumn menu launch! Big love to the team.",
  "I think we should have more training on the gluten-free bread prep to avoid cross contamination.",
  "Can we look into a better way to organize the back storage? It's becoming a trip hazard.",
  "I love working here! Such a great vibe in the mornings.",
];

export async function seedInitialData(): Promise<void> {
  // Check if sites already exist
  const sitesSnap = await getDocs(collection(db, "sites"));
  if (!sitesSnap.empty) return; // Already seeded

  // Create sites and capture their IDs
  const siteIds: Record<string, string> = {};
  for (const site of SEED_SITES) {
    const ref = await addDoc(collection(db, "sites"), site);
    siteIds[site.name] = ref.id;
  }

  // Create users using their site IDs
  for (const user of SEED_USERS) {
    const { siteName, ...userData } = user;
    await addDoc(collection(db, "users"), {
      ...userData,
      siteId: siteIds[siteName] ?? "unassigned",
    });
  }

  // Seed shower thoughts as anonymous from tristenb
  const tristenbSnap = await getDocs(
    query(collection(db, "users"), where("username", "==", "tristenb"))
  );
  const tristenbId = tristenbSnap.docs[0]?.id ?? "system";
  const eastEndId = siteIds["East End Pastries"] ?? "unassigned";

  for (const text of SEED_SHOWER_THOUGHTS) {
    await addDoc(collection(db, "showerThoughts"), {
      text,
      anonymous: true,
      authorUsername: "anonymous",
      authorName: "Anonymous",
      siteId: eastEndId,
      createdAt: serverTimestamp(),
    });
  }
}

// ── Sites ──────────────────────────────────────────────────────────────────

export function subscribeSites(callback: (sites: Site[]) => void): Unsubscribe {
  return onSnapshot(collection(db, "sites"), (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Site)));
  });
}

export async function updateSite(siteId: string, data: Partial<Omit<Site, "id">>): Promise<void> {
  await updateDoc(doc(db, "sites", siteId), data);
}

export async function addSite(data: Omit<Site, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "sites"), data);
  return ref.id;
}

export async function deleteSite(siteId: string): Promise<void> {
  await deleteDoc(doc(db, "sites", siteId));
}

// ── Users ──────────────────────────────────────────────────────────────────

export function subscribeUsers(callback: (users: User[]) => void): Unsubscribe {
  return onSnapshot(collection(db, "users"), (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as User)));
  });
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const snap = await getDocs(
    query(collection(db, "users"), where("username", "==", username))
  );
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as User;
}

export async function updateUser(userId: string, data: Partial<Omit<User, "id">>): Promise<void> {
  await updateDoc(doc(db, "users", userId), data);
}

export async function deleteUsersForSite(siteId: string, preserveSuperAdmins = true): Promise<void> {
  const snap = await getDocs(
    query(collection(db, "users"), where("siteId", "==", siteId))
  );
  for (const d of snap.docs) {
    const user = d.data() as Omit<User, "id">;
    if (preserveSuperAdmins && (user.role === "Super Admin" || user.username === "tristenb")) {
      continue;
    }
    await deleteDoc(d.ref);
  }
}

// ── Shower Thoughts ────────────────────────────────────────────────────────

export function subscribeShowerThoughts(
  callback: (thoughts: ShowerThought[]) => void
): Unsubscribe {
  const q = query(collection(db, "showerThoughts"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ShowerThought)));
  });
}

export async function addShowerThought(
  data: Omit<ShowerThought, "id" | "createdAt">
): Promise<void> {
  await addDoc(collection(db, "showerThoughts"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

// ── Pulse Responses ────────────────────────────────────────────────────────

export async function addPulseResponse(data: Omit<PulseResponse, "id" | "createdAt">): Promise<void> {
  await addDoc(collection(db, "pulseResponses"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

// ── Feedback Requests ──────────────────────────────────────────────────────

export function subscribeFeedbackRequests(
  username: string,
  callback: (requests: FeedbackRequest[]) => void
): Unsubscribe {
  const q = query(
    collection(db, "feedbackRequests"),
    where("toUsername", "==", username),
    where("status", "==", "pending")
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as FeedbackRequest)));
  });
}

export async function addFeedbackRequest(data: {
  fromUsername: string;
  fromName: string;
  toUsername: string;
  toName: string;
  surveyType: string;
}): Promise<void> {
  await addDoc(collection(db, "feedbackRequests"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}
