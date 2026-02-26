import { supabase } from "../config/supabaseClient.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // 1️⃣ Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const user = data.user;

    // 2️⃣ Insert into profiles table
    await supabase.from("profiles").insert([
      {
        id: user.id,
        email,
        username,
      },
    ]);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      session: data.session,
      user: data.user,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};