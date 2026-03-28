// api/config.js
// Vercel serverless function — serves Supabase credentials from environment variables.
// The credentials never touch the frontend source code or git repo.
// Set these in: Vercel Dashboard → Your Project → Settings → Environment Variables

export default function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(500).json({
      error: 'Supabase environment variables are not configured. ' +
             'Add SUPABASE_URL and SUPABASE_ANON_KEY in your Vercel project settings.'
    });
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Cache for 5 minutes — credentials don't change
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  return res.status(200).json({ url, key });
}
