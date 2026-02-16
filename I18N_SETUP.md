# i18next Setup Guide

This project now includes internationalization (i18n) support using i18next and i18next-parser.

## Installation

First, install the required dependencies:

```bash
npm install i18next react-i18next i18next-browser-languagedetector i18next-parser
```

## Features

- ✅ **9 Languages Supported**: English, Spanish, French, German, Italian, Portuguese, Japanese, Chinese, Korean
- ✅ **Language Switcher**: Beautiful dropdown component in the navbar
- ✅ **Automatic Language Detection**: Detects user's browser language
- ✅ **Persistent Language Selection**: Saves language preference in localStorage
- ✅ **i18next-parser**: Automatically extracts translation keys from your code

## Usage

### Using Translations in Components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.dashboard')}</h1>
      <p>{t('experience.title')}</p>
      {/* With interpolation */}
      <p>{t('experience.experienceNumber', { number: 1 })}</p>
    </div>
  );
}
```

### Extracting New Translation Keys

When you add new translatable strings to your code, run:

```bash
npm run i18n:extract
```

This will:
- Scan your codebase for `t()` calls
- Extract new translation keys
- Add them to all language files
- Preserve existing translations

### Adding New Languages

1. Add the language code to `i18next-parser.config.js` in the `locales` array
2. Create a new translation file at `src/locales/[language-code]/translation.json`
3. Copy the structure from `src/locales/en/translation.json`
4. Translate all the values
5. Import and add it to `src/lib/i18n.ts`

### Language Switcher

The language switcher is automatically included in the NavBar component. Users can:
- Click the globe icon to see all available languages
- Select a language to switch immediately
- Their preference is saved in localStorage

## File Structure

```
src/
├── lib/
│   └── i18n.ts                    # i18next configuration
├── locales/
│   ├── en/
│   │   └── translation.json      # English translations
│   ├── es/
│   │   └── translation.json      # Spanish translations
│   ├── fr/
│   │   └── translation.json      # French translations
│   └── ...                        # Other languages
└── components/
    ├── I18nProvider.tsx           # i18next provider wrapper
    └── layout/
        └── LanguageSwitcher.tsx   # Language switcher component
```

## Translation Keys Structure

Translations are organized by feature/section:

- `nav.*` - Navigation items
- `experience.*` - Experience editor
- `about.*` - About section
- `hero.*` - Hero section
- `home.*` - Home page
- `common.*` - Common UI elements

## Example: Updating a Component

Before:
```tsx
<h2>Experience</h2>
<p>Your professional journey</p>
```

After:
```tsx
const { t } = useTranslation();

<h2>{t('experience.title')}</h2>
<p>{t('experience.subtitle')}</p>
```

Then run `npm run i18n:extract` to ensure the keys are in all language files.

## Notes

- The language preference is stored in localStorage with the key `i18nextLng`
- The default language is English (`en`)
- All components using translations must be wrapped in the `I18nProvider` (already done in `layout.tsx`)
