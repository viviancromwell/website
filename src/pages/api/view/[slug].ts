export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params;

  // Upsert: increment views, insert with views=1 if new
  const { error } = await supabase.rpc('increment_views', { article_slug: slug });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
