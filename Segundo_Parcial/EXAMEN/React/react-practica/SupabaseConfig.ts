import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://dvegvkhazlsdhikqxnws.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2ZWd2a2hhemxzZGhpa3F4bndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxOTI4MTIsImV4cCI6MjA2OTc2ODgxMn0.NBWtE6xL3hPgzuFP2AI_frk09pqF9NPHZjbgpa32RCQ';

export const supabase = createClient(supabaseUrl, supabaseKey)