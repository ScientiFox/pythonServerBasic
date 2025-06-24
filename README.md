A barebones scaffold for a python server to interface with a browser.

The python server side implements SSL, and requires a PEM key and cert, locally signable through openSSL or what have you.

It also handles asset GET requests (like for images, or scripts- anything with an `src` parameter it needs to fetch) automatically by searching an assets folder for file names, and pulling the requisite type from the original request. 

The client side is the initially served HTML, which is currently just one of the tinker scripts. It could natually be anything, and with the assets folder filled with whatever.

The main purpose of the repo is to have the plug-in template for a real, SSL compliant, handles-fetches python server ready to go.

**Requires the cert to be whitelisted in a browser, since your homebrew, self-signed cert and key probably aren't in the browser's list of trusted sources!**
