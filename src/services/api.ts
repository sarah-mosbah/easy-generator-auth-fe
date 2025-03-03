import { CreateUserDto } from "../dto/CreateUserDto";
import { ProfileResponse } from "../dto/ProfileResponse";
import { SignInDto } from "../dto/SignInDto";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const signup = async (userData: CreateUserDto): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch (error) {}

  if (!response.ok) {
    throw new Error(responseData?.message || "Signup failed");
  }

  return responseData;
};

export const signin = async (userData: SignInDto): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Invalid username or password");
  }
};

export const verifyEmail = async (token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/auth/verify-email?token=${token}`
  );
  if (!response.ok) {
    throw new Error("Email verification failed");
  }
};

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await fetch(`${API_BASE_URL}/home`, {
    credentials: "include",
  });

  if (response.status === 401) {
    throw new Error("Unauthorized");
  } else if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json() as Promise<ProfileResponse>;
};


export const signout = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/auth/signout`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Signout failed");
  }
}