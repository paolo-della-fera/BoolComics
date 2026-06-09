# 📚 BoolComics

BoolComics è una piattaforma e-commerce dedicata al mondo dei fumetti — manga, graphic novel e comics. Pensata sia per il collezionista esperto che per il neofita, offre un'esperienza fresca, pop e coinvolgente che invoglia a esplorare e scoprire nuovi titoli.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white)

---

## ✨ Funzionalità

- 🏠 **Homepage** con hero section e sezioni prodotti (più venduti, ultimi arrivi)
- 🔍 **Ricerca** con ordinamento per prezzo, nome e data
- 📖 **Pagina prodotto** con dettagli e aggiunta al carrello
- 🛒 **Carrello** con gestione quantità e totale
- 💳 **Checkout** con dati di fatturazione, spedizione e riepilogo ordine
- 📧 **Email di conferma** ordine al cliente e al venditore
- 🚚 Spedizione gratuita
- 🏷️ Codici sconto
- ❤️ Wishlist
- 🔗 Prodotti correlati
- 📦 Gestione quantità disponibile

---

## 📁 Struttura del progetto

```
BoolComics/
├── boolcomics-be/   # Backend — Node.js + Express
└── boolcomics-fe/   # Frontend — React + Vite
```

---

## ⚙️ Configurazione

### Backend — `boolcomics-be/.env`

Crea un file `.env` nella cartella `boolcomics-be` copiando il file `.env.example`:

```env
PORT=YourPortHere

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YourPasswordHere
DB_NAME=YourDatabaseNameHere

TOKEN=YourTokenHere
ADMIN_TOKEN=ADMINTokenHere
ADMIN_EMAIL=MyAdminEmailHere
```

### Frontend — `boolcomics-fe/.env`

Crea un file `.env` nella cartella `boolcomics-fe` copiando il file `.env.example`:

```env
VITE_API_URL=http://localhost:3010
```

> Assicurati che `VITE_API_URL` corrisponda alla porta impostata nel `.env` del backend.

---

## 🚀 Avvio del progetto

Apri **due terminali separati**.

### Terminale 1 — Backend

```bash
cd boolcomics-be
npm install
npm run dev
```

### Terminale 2 — Frontend

```bash
cd boolcomics-fe
npm install
npm run dev
```

Il frontend sarà disponibile su `http://localhost:5173` e il backend su `http://localhost:PORT` (quella impostata nel `.env`).

---

## 👥 Il team

![Frontend](https://img.shields.io/badge/🎨_Frontend-E96B2B?style=for-the-badge)
[![paolo-della-fera](https://img.shields.io/badge/@paolo--della--fera-E96B2B?style=flat-square&logo=github&logoColor=white)](https://github.com/paolo-della-fera)
[![carminenicotera](https://img.shields.io/badge/@carminenicotera-E96B2B?style=flat-square&logo=github&logoColor=white)](https://github.com/carminenicotera)
[![ernestocostanzo51](https://img.shields.io/badge/@ernestocostanzo51-E96B2B?style=flat-square&logo=github&logoColor=white)](https://github.com/ernestocostanzo51)

![Backend](https://img.shields.io/badge/⚙️_Backend-1B2A4A?style=for-the-badge)
[![gialli24](https://img.shields.io/badge/@gialli24-1B2A4A?style=flat-square&logo=github&logoColor=white)](https://github.com/gialli24)
[![stefanosorrenti](https://img.shields.io/badge/@stefanosorrenti-1B2A4A?style=flat-square&logo=github&logoColor=white)](https://github.com/stefanosorrenti)
[![Veronica-Golinelli](https://img.shields.io/badge/@Veronica--Golinelli-1B2A4A?style=flat-square&logo=github&logoColor=white)](https://github.com/desmoveronica2002-bot)

