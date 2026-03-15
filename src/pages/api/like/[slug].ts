export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ params }) => {
  const { slug } = params;

  const { error } = await supabase.rpc('increment_likes', { article_slug: slug });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Return updated count
  const { data } = await supabase
    .from('article_stats')
    .select('likes')
    .eq('slug', slug)
    .single();

  return new Response(JSON.stringify({ likes: data?.likes || 0 }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
