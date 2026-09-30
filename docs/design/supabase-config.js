/* Insight Advora LLP — Supabase connection for the public website.
   The publishable key is safe to ship in the browser: row level security on
   public.leads allows INSERT only, and no public SELECT. Never put the
   service_role key in front-end code.

   Project: Insight Advora LLP (ap-south-1 / Mumbai)
*/
window.IA_SUPABASE = {
  url: 'https://kgyrgmylblfsznqbpdyv.supabase.co',
  publishableKey: 'sb_publishable_n4AuNunBAH2yEFg78ZrxRw_XgUB4nW_',
  table: 'leads'
};

/* Contact details shown on the site — edit here, not in the page markup. */
window.IA_CONTACT = {
  email: 'info@insightjuris.in',
  phone: '+91 124-4462410',
  phoneHref: 'tel:+911244462410',
  address: '363A, JMD Empire, 3rd Floor, Block D, Sector 62, Gurugram, Haryana 122102',
  linkedin: '#',
  hours: 'Monday to Friday, 10:00 – 18:00 IST',
  mapEmbedUrl: 'https://maps.google.com/maps?q=JMD%20Empire%2C%20Sector%2062%2C%20Gurugram%2C%20Haryana%20122102&z=16&output=embed',
  mapLinkUrl: 'https://www.google.com/maps/search/?api=1&query=JMD%20Empire%2C%20Sector%2062%2C%20Gurugram%2C%20Haryana%20122102'
};
