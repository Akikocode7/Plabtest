// api/config.js — Vercel serverless function
// Serves Supabase credentials from environment variables.
// Set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel project settings.

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return res.status(500).json({
      error: 'SUPABASE_URL and SUPABASE_ANON_KEY are not set in Vercel environment variables.'
    });
  }

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
  return res.status(200).json({ url, key });
};
