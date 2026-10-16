/* ==========================================================================
   SITE CONFIGURATION
   The only file you need to touch to connect the form and contact details.
   Everything here is optional until you are ready to publish.
   ========================================================================== */

window.SITE_CONFIG = {
  /* ------------------------------------------------------------------
     1. AIRTABLE EXPRESSION-OF-INTEREST FORM
     ------------------------------------------------------------------
     Paste ONE of the following between the quotes below:

       a) The shared form link from Airtable
          (Form view > Share form > Copy link), e.g.
          "https://airtable.com/shrXXXXXXXXXXXXXX"

       b) The embed URL from Airtable, e.g.
          "https://airtable.com/embed/shrXXXXXXXXXXXXXX"

       c) The whole <iframe ...></iframe> embed code from Airtable.
          (The site will pick out the address and ignore the rest.)

     Leave it empty ("") and the page shows a clearly labelled
     "form not connected yet" panel instead. Nothing is submitted
     anywhere until you add a real form here.
     ------------------------------------------------------------------ */
  airtableForm: '<iframe class="airtable-embed" src="https://airtable.com/embed/appeuePKRvrLzHRmU/pagxHOUO0fTalPzbd/form" frameborder="0" width="100%" height="533"></iframe>',

  /* "embed" shows the form inside the page.
     "link"  shows a button that opens the form in a new tab instead. */
  airtableMode: "embed",

  /* Height of the embedded form, in pixels. Increase it if the form
     scrolls inside its frame. */
  airtableEmbedHeight: 900,

  /* ------------------------------------------------------------------
     2. CONTACT DETAILS (footer)
     ------------------------------------------------------------------
     Leave empty to show a placeholder (email) or hide the link (social). */
  contactEmail: "",
  linkedin: "", // e.g. "https://www.linkedin.com/company/your-page"
  instagram: "" // e.g. "https://www.instagram.com/your-handle"
};
