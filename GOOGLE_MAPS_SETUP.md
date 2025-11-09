# Google Maps API Setup Instructions

## Prerequisites

Before running the app with Google Maps functionality, ensure the following are configured in Google Cloud Console (same project as the API key):

### 1. Enable Required APIs

Enable these APIs in your Google Cloud project:
- **Maps JavaScript API** (required)
- **Places API** (required)
- **Geocoding API** (optional)

### 2. Enable Billing

- Billing must be enabled on the Google Cloud project
- Google Maps Platform requires a billing account (even for free tier usage)

### 3. Configure API Key Restrictions

For development on `http://localhost:5175`, add these HTTP referrer restrictions to your API key:

- `http://localhost:5175/*`
- `http://localhost:*/*` (for flexibility during development)

**Note:** For production, update restrictions to your production domain.

### 4. API Key Configuration

- Use a **normal Google Maps Platform API key** (not a Gemini key)
- Rotate/regenerate the key if it has been exposed
- Store the key in `.env` file as `VITE_GOOGLE_MAPS_API_KEY`

### 5. Environment Setup

The API key is loaded from environment variables:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

**Important:** Restart the dev server after updating the `.env` file.

## Current Configuration

- **Development URL:** `http://localhost:5175`
- **Framework:** Vite + React
- **API Loader:** `@googlemaps/js-api-loader` (using functional API: `setOptions()` and `importLibrary()`)

## Troubleshooting

If you see `ApiProjectMapError`:
- Verify billing is enabled
- Check that Maps JavaScript API is enabled
- Verify API key restrictions allow `localhost:5175`

If you see "Library is incomplete" errors:
- Check browser console for blocked requests
- Disable ad blockers that might block Google Maps scripts
- Verify all required APIs are enabled

