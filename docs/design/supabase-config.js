/* Insight Advora LLP — Supabase connection for the public website.
   The publishable key is safe to ship in the browser: row level security on
   public.leads allows INSERT only, and no public SELECT. Never put the
   service_role key in front-end code.

   Project: Insight Advora LLP (ap-south-1 / Mumbai)
*/
window.IA_SUPABASE = {
  url: 'https://kgyrgmylblfsznqbpdyv.supabase.co',
  publishableKey: '[ set NEXT_PUBLIC_SUPABASE_ANON_KEY in the app environment ]',
  table: 'leads'
};

/* Contact details shown on the site — edit here, not in the page markup. */
window.IA_CONTACT = {
  email: '[ email@insightadvora.com ]',
  phone: '[ +91 00000 00000 ]',
  address: '[ Registered office address, City, State, PIN ]',
  linkedin: '#',
  hours: 'Monday to Friday, 10:00 – 18:00 IST',
  mapEmbedUrl: ''
};
