import { supabase } from "../config/supabaseClient.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const createProject = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return errorResponse(res, 400, "All fields required");
  }

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title,
        description,
        owner_id: req.user.id,
      },
    ])
    .select();

  if (error) return errorResponse(res, 400, error.message);

  return successResponse(res, 201, "Project created", data);
};

export const getProjects = async (req, res) => {
  const { data, error } = await supabase
    .from("projects")
    .select("*");

  if (error) return errorResponse(res, 400, error.message);

  return successResponse(res, 200, "Projects fetched", data);
};