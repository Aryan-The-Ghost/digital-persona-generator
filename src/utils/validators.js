import { z } from "zod";


export const wizardSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  
  vibe: z.string().min(1, "Please choose a vibe"),

  
  audience: z.string().min(3, "Audience must be at least 3 characters"),

  colorPreference: z.string().optional(),


  goal: z.string().min(2, "Please describe your goal"),
});
