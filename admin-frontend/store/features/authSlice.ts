import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Admin, AdminSession } from "../../lib/authTypes";

import { apiUrl } from "../../lib/apiUrl";
import { refreshSession, markSignedOut, allowSessionRestore, isSignedOut } from "../../lib/session";
const API_URL = apiUrl("/api/auth");

interface AuthState {
  admin: Admin | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  sessionChecked: boolean;
  error: string | null;
}

interface LoginDetails {
  email: string;
  password: string;
}

const initialState: AuthState = {
  admin: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  sessionChecked: false,
  error: null,
};

export const loginAdmin = createAsyncThunk<
  AdminSession,
  LoginDetails,
  { rejectValue: string }
>("auth/loginAdmin", async (loginDetails, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(loginDetails),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.message || "Admin login failed");
    }

    allowSessionRestore();
    return data;
  } catch {
    return rejectWithValue("Unable to connect to the server");
  }
});

export const restoreAdminSession = createAsyncThunk<
  AdminSession,
  void,
  { rejectValue: string }
>("auth/restoreAdminSession", async (_, { rejectWithValue }) => {
  try {
    if (isSignedOut()) return rejectWithValue("Signed out");
    return await refreshSession();
  } catch {
    return rejectWithValue("Unable to restore the session");
  }
});

export const logoutAdmin = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logoutAdmin", async (_, { rejectWithValue }) => {
  markSignedOut();
  try {
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const data = await response.json();
      return rejectWithValue(data.message || "Logout failed");
    }
  } catch {
    return rejectWithValue("Unable to connect to the server");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearSession: () => ({ ...initialState, sessionChecked: true }),
    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionChecked = true;
        state.admin = action.payload.admin;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.sessionChecked = true;
        state.admin = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.error = action.payload || "Admin login failed";
      })

      // Restore session
      .addCase(restoreAdminSession.pending, (state) => {
        if (!state.isAuthenticated) state.sessionChecked = false;
      })

      .addCase(restoreAdminSession.fulfilled, (state, action) => {
        state.sessionChecked = true;
        state.admin = action.payload.admin;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(restoreAdminSession.rejected, (state) => {
        state.sessionChecked = true;
        state.admin = null;
        state.accessToken = null;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logoutAdmin.pending, (state) => {
        state.admin = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.sessionChecked = true;
        state.loading = true;
      })

      .addCase(logoutAdmin.fulfilled, (state) => {
        state.loading = false;
        state.sessionChecked = true;
        state.admin = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })

      .addCase(logoutAdmin.rejected, (state, action) => {
        state.loading = false;
        state.admin = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.sessionChecked = true;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { clearAuthError, clearSession } = authSlice.actions;
export default authSlice.reducer;
