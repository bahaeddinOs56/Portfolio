import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("Missing Supabase environment variables")
}

let supabase: any

try {
  supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!, {
    auth: { persistSession: false },
  })
  console.log("Supabase client created successfully")
} catch (error) {
  console.error("Error creating Supabase client:", error)
}

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("Supabase configuration is missing")
    return NextResponse.json({ success: false, message: "Server configuration error" }, { status: 500 })
  }

  if (!supabase) {
    console.error("Supabase client not initialized")
    return NextResponse.json({ success: false, message: "Server initialization error" }, { status: 500 })
  }

  try {
    const data = await request.json()
    console.log("Received data:", data)

    // Store the message in Supabase
    const { data: insertedData, error } = await supabase
      .from("messages")
      .insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        {
          success: false,
          message: "Failed to store message",
          error: error.message,
          details: error,
        },
        { status: 500 },
      )
    }

    console.log("Message stored successfully:", insertedData)
    return NextResponse.json({
      success: true,
      message: "Message stored successfully",
    })
  } catch (error) {
    console.error("Error storing message:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to store message",
        error: error instanceof Error ? error.message : "Unknown error",
        details: error,
      },
      { status: 500 },
    )
  }
}

