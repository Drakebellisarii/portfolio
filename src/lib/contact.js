const ENDPOINT = 'https://formspree.io/f/mzzvglrd';

/** Posts a contact-form submission to Formspree. Resolves on success, throws otherwise. */
export async function sendMessage({ name, contactMethod, message }) {
  const body = new FormData();
  body.append('name', name);
  body.append('contactMethod', contactMethod);
  body.append('message', message);

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    body,
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
}
