"use client";

/**
 * Central app state — persists to localStorage.
 * Replaces scattered useState across pages with one source of truth.
 */

import React, { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { mockPosts, mockNotifications } from "@/lib/mockData";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AppPost {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorRole: "CREATOR" | "AGENCY" | "BRAND";
  authorVerified: boolean;
  content: string;
  type: "post" | "campaign" | "achievement" | "collab";
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  image?: string;
  campaignRef?: string;
}

export interface AppComment {
  id: string;
  postId: string;
  authorName: string;
  authorUsername: string;
  authorRole: "CREATOR" | "AGENCY" | "BRAND";
  content: string;
  createdAt: string;
}

export interface CampaignApplication {
  campaignId: string;
  appliedAt: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  applicantName: string;
  applicantUsername: string;
  applicantFollowers: number;
}

export interface AppNotification {
  id: string;
  type: "message" | "proposal" | "visit" | "review" | "campaign" | "accepted" | "follow";
  title: string;
  body: string;
  fromName: string;
  fromUsername?: string;
  read: boolean;
  createdAt: string;
}

export interface ProfileUpdate {
  bio?: string;
  country?: string;
  niche?: string[];
  platforms?: string[];
  website?: string;
  displayName?: string;
}

// ─── State ────────────────────────────────────────────────────────────────────

interface AppState {
  // Feed posts (user-created on top of mock)
  userPosts: AppPost[];
  liked: string[];           // post IDs liked by current user
  bookmarked: string[];      // post IDs bookmarked
  comments: Record<string, AppComment[]>; // postId → comments

  // Social graph
  following: string[];       // usernames being followed

  // Campaigns
  applications: CampaignApplication[]; // all applications made

  // Notifications (real ones on top of mock)
  notifications: AppNotification[];
  notifRead: string[];       // IDs marked as read

  // Profile edits
  profile: ProfileUpdate;

  // Search
  searchQuery: string;
}

const INITIAL_STATE: AppState = {
  userPosts: [],
  liked: [],
  bookmarked: [],
  comments: {},
  following: [],
  applications: [],
  notifications: [],
  notifRead: [],
  profile: {},
  searchQuery: "",
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: "LOAD"; payload: Partial<AppState> }
  | { type: "CREATE_POST"; payload: AppPost }
  | { type: "TOGGLE_LIKE"; postId: string }
  | { type: "TOGGLE_BOOKMARK"; postId: string }
  | { type: "ADD_COMMENT"; comment: AppComment }
  | { type: "TOGGLE_FOLLOW"; username: string }
  | { type: "APPLY_CAMPAIGN"; application: CampaignApplication }
  | { type: "UPDATE_APPLICATION_STATUS"; campaignId: string; applicantUsername: string; status: "accepted" | "rejected" }
  | { type: "ADD_NOTIFICATION"; notif: AppNotification }
  | { type: "MARK_NOTIF_READ"; id: string }
  | { type: "MARK_ALL_READ" }
  | { type: "UPDATE_PROFILE"; profile: ProfileUpdate }
  | { type: "SET_SEARCH"; query: string };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOAD":
      return { ...state, ...action.payload };
    case "CREATE_POST":
      return { ...state, userPosts: [action.payload, ...state.userPosts] };
    case "TOGGLE_LIKE":
      return {
        ...state,
        liked: state.liked.includes(action.postId)
          ? state.liked.filter((id) => id !== action.postId)
          : [...state.liked, action.postId],
      };
    case "TOGGLE_BOOKMARK":
      return {
        ...state,
        bookmarked: state.bookmarked.includes(action.postId)
          ? state.bookmarked.filter((id) => id !== action.postId)
          : [...state.bookmarked, action.postId],
      };
    case "ADD_COMMENT":
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.comment.postId]: [
            ...(state.comments[action.comment.postId] ?? []),
            action.comment,
          ],
        },
      };
    case "TOGGLE_FOLLOW":
      return {
        ...state,
        following: state.following.includes(action.username)
          ? state.following.filter((u) => u !== action.username)
          : [...state.following, action.username],
      };
    case "APPLY_CAMPAIGN":
      return { ...state, applications: [...state.applications, action.application] };
    case "UPDATE_APPLICATION_STATUS":
      return {
        ...state,
        applications: state.applications.map((a) =>
          a.campaignId === action.campaignId && a.applicantUsername === action.applicantUsername
            ? { ...a, status: action.status }
            : a
        ),
      };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.notif, ...state.notifications] };
    case "MARK_NOTIF_READ":
      return {
        ...state,
        notifRead: state.notifRead.includes(action.id)
          ? state.notifRead
          : [...state.notifRead, action.id],
      };
    case "MARK_ALL_READ":
      return {
        ...state,
        notifRead: Array.from(
          new Set([
            ...state.notifRead,
            ...mockNotifications.map((n) => n.id),
            ...state.notifications.map((n) => n.id),
          ])
        ),
      };
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.profile } };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.query };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  state: AppState;
  // Feed
  createPost: (content: string, type: AppPost["type"], image?: string) => void;
  toggleLike: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
  addComment: (postId: string, content: string, author: { name: string; username: string; role: AppPost["authorRole"] }) => void;
  getComments: (postId: string) => AppComment[];
  isLiked: (postId: string) => boolean;
  isBookmarked: (postId: string) => boolean;
  getLikeCount: (postId: string, baseLikes: number) => number;
  getCommentCount: (postId: string, baseComments: number) => number;
  // Social
  toggleFollow: (username: string) => void;
  isFollowing: (username: string) => boolean;
  // Campaigns
  applyToCampaign: (campaignId: string, message: string, applicant: { name: string; username: string; followers: number }) => void;
  hasApplied: (campaignId: string) => boolean;
  getApplications: (campaignId: string) => CampaignApplication[];
  updateApplicationStatus: (campaignId: string, applicantUsername: string, status: "accepted" | "rejected") => void;
  // Notifications
  allNotifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  // Profile
  updateProfile: (data: ProfileUpdate) => void;
  // Search
  setSearch: (q: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = "mc_app_state_v2";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<AppState>;
        dispatch({ type: "LOAD", payload: saved });
      }
    } catch { /* ignore */ }
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch { /* ignore */ }
  }, [state]);

  // ─── Actions ────────────────────────────────────────────────────────────────

  const createPost = useCallback((content: string, type: AppPost["type"], image?: string) => {
    const post: AppPost = {
      id: `user-post-${Date.now()}`,
      authorId: "current-user",
      authorName: state.profile.displayName ?? "Tú",
      authorUsername: "me",
      authorRole: "CREATOR",
      authorVerified: false,
      content,
      type,
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      image,
    };
    dispatch({ type: "CREATE_POST", payload: post });
    // Notify self (activity)
    dispatch({
      type: "ADD_NOTIFICATION",
      notif: {
        id: `notif-post-${Date.now()}`,
        type: "campaign",
        title: "Post publicado",
        body: `Tu post ha sido publicado exitosamente.`,
        fromName: "Mundo Creadores",
        read: false,
        createdAt: new Date().toISOString(),
      },
    });
  }, [state.profile.displayName]);

  const toggleLike = useCallback((postId: string) => {
    dispatch({ type: "TOGGLE_LIKE", postId });
  }, []);

  const toggleBookmark = useCallback((postId: string) => {
    dispatch({ type: "TOGGLE_BOOKMARK", postId });
  }, []);

  const addComment = useCallback(
    (postId: string, content: string, author: { name: string; username: string; role: AppPost["authorRole"] }) => {
      dispatch({
        type: "ADD_COMMENT",
        comment: {
          id: `comment-${Date.now()}`,
          postId,
          authorName: author.name,
          authorUsername: author.username,
          authorRole: author.role,
          content,
          createdAt: new Date().toISOString(),
        },
      });
    },
    []
  );

  const toggleFollow = useCallback((username: string) => {
    dispatch({ type: "TOGGLE_FOLLOW", username });
    const wasFollowing = state.following.includes(username);
    if (!wasFollowing) {
      dispatch({
        type: "ADD_NOTIFICATION",
        notif: {
          id: `notif-follow-${Date.now()}`,
          type: "follow",
          title: "Ahora sigues a @" + username,
          body: `Verás sus posts en tu feed.`,
          fromName: username,
          fromUsername: username,
          read: false,
          createdAt: new Date().toISOString(),
        },
      });
    }
  }, [state.following]);

  const applyToCampaign = useCallback(
    (campaignId: string, message: string, applicant: { name: string; username: string; followers: number }) => {
      dispatch({
        type: "APPLY_CAMPAIGN",
        application: {
          campaignId,
          appliedAt: new Date().toISOString(),
          message,
          status: "pending",
          applicantName: applicant.name,
          applicantUsername: applicant.username,
          applicantFollowers: applicant.followers,
        },
      });
      dispatch({
        type: "ADD_NOTIFICATION",
        notif: {
          id: `notif-apply-${Date.now()}`,
          type: "accepted",
          title: "Aplicación enviada",
          body: `Tu aplicación ha sido enviada exitosamente.`,
          fromName: "Mundo Creadores",
          read: false,
          createdAt: new Date().toISOString(),
        },
      });
    },
    []
  );

  const updateApplicationStatus = useCallback(
    (campaignId: string, applicantUsername: string, status: "accepted" | "rejected") => {
      dispatch({ type: "UPDATE_APPLICATION_STATUS", campaignId, applicantUsername, status });
    },
    []
  );

  const markRead = useCallback((id: string) => {
    dispatch({ type: "MARK_NOTIF_READ", id });
  }, []);

  const markAllRead = useCallback(() => {
    dispatch({ type: "MARK_ALL_READ" });
  }, []);

  const updateProfile = useCallback((data: ProfileUpdate) => {
    dispatch({ type: "UPDATE_PROFILE", profile: data });
  }, []);

  const setSearch = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH", query });
  }, []);

  // ─── Derived values ─────────────────────────────────────────────────────────

  const allNotifications: AppNotification[] = [
    ...state.notifications,
    ...mockNotifications.map((n) => ({
      ...n,
      fromUsername: n.fromUsername,
    })),
  ];

  const unreadCount = allNotifications.filter(
    (n) => !state.notifRead.includes(n.id) && !n.read
  ).length;

  const value: AppContextValue = {
    state,
    createPost,
    toggleLike,
    toggleBookmark,
    addComment,
    getComments: (postId) => state.comments[postId] ?? [],
    isLiked: (postId) => state.liked.includes(postId),
    isBookmarked: (postId) => state.bookmarked.includes(postId),
    getLikeCount: (postId, base) => {
      const liked = state.liked.includes(postId);
      return base + (liked ? 1 : 0);
    },
    getCommentCount: (postId, base) => base + (state.comments[postId]?.length ?? 0),
    toggleFollow,
    isFollowing: (username) => state.following.includes(username),
    applyToCampaign,
    hasApplied: (campaignId) => state.applications.some((a) => a.campaignId === campaignId),
    getApplications: (campaignId) => state.applications.filter((a) => a.campaignId === campaignId),
    updateApplicationStatus,
    allNotifications,
    unreadCount,
    markRead,
    markAllRead,
    updateProfile,
    setSearch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
