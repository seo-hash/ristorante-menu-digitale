# Menu Digitale Ristorante

Menu digitale web app con pannello di amministrazione.

## Stack Tecnologico

- **Next.js 15** (App Router)
- **Supabase** (Database + Auth)
- **Tailwind CSS**
- **TypeScript**
- **Deploy su Vercel**

## Setup Locale

### 1. Installa le dipendenze

```bash
cd ~/Desktop/ristorante-menu-digitale
npm install
```

### 2. Configura Supabase

1. Vai su [supabase.com](https://supabase.com) e crea un nuovo progetto
2. Vai su **SQL Editor** ed esegui lo script in `supabase-schema.sql`
3. Vai su **Settings > API** e copia:
   - Project URL
   - anon public key
   - service_role key (secret)

### 3. Configura le variabili d'ambiente

Copia il file `.env.local.example` in `.env.local`:

```bash
cp .env.local.example .env.local
```

Modifica `.env.local` con i tuoi valori:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

### 4. Crea un utente admin su Supabase

1. Vai su **Authentication > Users** nel dashboard Supabase
2. Clicca **Add User** e crea un account con email e password
3. Questa sarà la credenziale per accedere al pannello admin

### 5. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

## Struttura del Progetto

```
ristorante-menu-digitale/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage
│   │   ├── menu/             # Menu pubblico (visibile a tutti)
│   │   └── admin/            # Pannello admin (richiede login)
│   │       ├── login/        # Pagina di login
│   │       └── dashboard/    # Gestione menu
│   ├── components/           # Componenti riutilizzabili
│   └── lib/                  # Client Supabase
├── supabase-schema.sql       # Schema database
└── .env.local.example        # Template variabili ambiente
```

## Deploy su Vercel

1. Pusha il progetto su GitHub
2. Vai su [vercel.com](https://vercel.com)
3. Importa il repository
4. Aggiungi le variabili d'ambiente nelle impostazioni del progetto
5. Deploy!

## Pagine

- **`/`** - Homepage con link al menu e area riservata
- **`/menu`** - Menu pubblico visibile a tutti i clienti
- **`/admin/login`** - Login per il proprietario
- **`/admin/dashboard`** - Pannello per aggiungere/modificare/eliminare piatti

## Funzionalità

- ✅ Menu pubblico responsive
- ✅ Pannello admin protetto da autenticazione
- ✅ Aggiunta, modifica ed eliminazione piatti
- ✅ Categorie dinamiche
- ✅ Gestione disponibilità piatti
- ✅ Prezzi in tempo reale
