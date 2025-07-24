// Conexion con la base de datos, tuve que instalar la extension con este comando: npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lsokmokhxmslvlrlwfem.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxzb2ttb2toeG1zbHZscmx3ZmVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODkzNzMsImV4cCI6MjA2NzA2NTM3M30.Vv-5aW3TmFqOYFRx-88qQ3WW8orEngA-au1tlf19iG0'
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})



// Codigo Creado por Taylor Steven Alava Gresely
