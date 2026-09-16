import assert from "node:assert/strict";
import { test } from "node:test";
import jwt from "jsonwebtoken";
import type { CookieOptions, Response } from "express";
import Admin = require("../models/Admin");
import { clearRefreshCookie, createAdminSession, hashToken, publicAdmin } from "../utils/adminSession";

test("sessions persist a token hash, rotate refresh tokens, and omit private admin fields", async (context) => {
  const previousAccessSecret = process.env.JWT_ACCESS_SECRET;
  const previousRefreshSecret = process.env.JWT_REFRESH_SECRET;
  process.env.JWT_ACCESS_SECRET = "access-secret-for-session-test";
  process.env.JWT_REFRESH_SECRET = "refresh-secret-for-session-test";
  context.after(() => {
    if (previousAccessSecret === undefined) delete process.env.JWT_ACCESS_SECRET;
    else process.env.JWT_ACCESS_SECRET = previousAccessSecret;
    if (previousRefreshSecret === undefined) delete process.env.JWT_REFRESH_SECRET;
    else process.env.JWT_REFRESH_SECRET = previousRefreshSecret;
  });

  const admin = new Admin({ name: "Test Admin", email: "admin@example.com", password: "private-password" });
  const save = context.mock.method(admin, "save", async () => admin);
  const cookies: { name: string; token: string; options: CookieOptions }[] = [];
  const response = {
    cookie(name: string, token: string, options: CookieOptions) {
      assert.equal(admin.refreshTokenHash, hashToken(token));
      cookies.push({ name, token, options });
    },
  } as Response;

  const first = await createAdminSession(admin, response);
  await createAdminSession(admin, response);
  assert.equal(save.mock.callCount(), 2);
  assert.notEqual(cookies[0].token, cookies[1].token);
  assert.equal(cookies[0].name, "refreshToken");
  assert.equal(cookies[0].options.httpOnly, true);
  assert.equal(cookies[0].options.path, "/api/auth");
  assert.deepEqual(Object.keys(first.admin).sort(), ["email", "id", "name", "role"]);
  assert.deepEqual(first.admin, publicAdmin(admin));
  const payload = jwt.verify(first.accessToken, process.env.JWT_ACCESS_SECRET!);
  assert.notEqual(typeof payload, "string");
  if (typeof payload !== "string") assert.equal(payload.adminId, admin.id);
});

test("clearing refresh cookies keeps the original path without an expiry duration", () => {
  let cleared = false;
  const response = {
    clearCookie(name: string, options: CookieOptions) {
      assert.equal(name, "refreshToken");
      assert.equal(options.path, "/api/auth");
      assert.equal(options.httpOnly, true);
      assert.equal(options.maxAge, undefined);
      cleared = true;
    },
  } as Response;
  clearRefreshCookie(response);
  assert.equal(cleared, true);
});
