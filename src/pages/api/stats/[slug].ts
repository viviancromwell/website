export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  const { data, error } = await supabase
    .from('article_stats')
    .select('views, likes')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data || { views: 0, likes: 0 }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
