CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a secure policy to only allow insert
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert" ON messages
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Optional: Create policy for viewing messages (restricted to authenticated users)
CREATE POLICY "Allow authenticated select" ON messages
    FOR SELECT
    TO authenticated
    USING (true);

