# Kung Fu Pan Asian × Canadian Classics — Phase 2 Prototype

Working customer ordering site + password-protected admin dashboard. Menu data matches the project PDF. Orders persist in `localStorage` (Phase 3 will move to Firebase/Supabase).

## Start locally

```bash
cd d:\kungfu
npm install
npm run dev
```

Open **http://localhost:5173/** (customer) and **http://localhost:5173/admin** (admin).

### Admin login (prototype)

- Username: `admin`
- Password: `kungfu2026`

## What’s included

- Dual brand theme switch (Kung Fu black/red `#D9261C` ↔ Canadian Classics yellow `#FFF200`)
- Hero, floating food motion, fade-up text, sticky category chips + scroll-spy
- Full Kung Fu + Canadian Classics menu (sizes, deals)
- Cart drawer, COD checkout, order numbers (`KF-1001`…), status flow
- Admin: live orders + sound alert, brand tags, status controls, menu/deals stubs, settings

## Out of scope (later)

- Kotlin app
- Real Firebase/Supabase production backend
- JazzCash / Easypaisa / card payments
- Real logo & food photography (placeholders for now)

## Open questions

- Delivery fee amount
- Minimum order value
- When to add online payment methods

## Stack

Vite + React + TypeScript + React Router · localStorage store
