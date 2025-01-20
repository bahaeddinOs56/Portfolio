"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching messages:", error)
      } else {
        setMessages(data || [])
      }
      setLoading(false)
    }

    fetchMessages()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Messages</h1>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <div key={message.id} className="bg-white shadow rounded-lg p-4">
              <p>
                <strong>Name:</strong> {message.first_name} {message.last_name}
              </p>
              <p>
                <strong>Email:</strong> {message.email}
              </p>
              <p>
                <strong>Phone:</strong> {message.phone || "N/A"}
              </p>
              <p>
                <strong>Message:</strong> {message.message}
              </p>
              <p>
                <strong>Sent at:</strong> {new Date(message.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

