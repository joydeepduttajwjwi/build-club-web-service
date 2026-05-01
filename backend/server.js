const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'data/db.json');

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(session({
  secret: 'buildclub-secret-2025',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'public/uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 30 * 1024 * 1024 } });

// DB helpers
const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
const genId = () => Math.random().toString(36).substr(2, 9);

// Admin credentials (in production use proper auth)
const ADMIN_USER = 'joydeepdutta855@gmail.com';
const ADMIN_PASS = '231456buildsirsac';
const ADMIN_TOKEN = Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString('base64');

const toList = (value) => {
  if (Array.isArray(value)) return value.map(String).map(v => v.trim()).filter(Boolean);
  if (!value) return [];
  return String(value).split(',').map(v => v.trim()).filter(Boolean);
};

// Auth middleware
const isAuthenticated = (req) => {
  const headerToken = req.get('x-admin-token');
  return req.session.authenticated || headerToken === ADMIN_TOKEN;
};

const requireAuth = (req, res, next) => {
  if (isAuthenticated(req)) return next();
  res.status(401).json({ error: 'Unauthorized' });
};

// ============ PUBLIC API ============

app.get('/api/data', (req, res) => {
  res.json(readDB());
});

app.get('/api/events', (req, res) => {
  const db = readDB();
  res.json(db.events);
});

app.get('/api/projects', (req, res) => {
  const db = readDB();
  res.json(db.projects);
});

app.get('/api/team', (req, res) => {
  const db = readDB();
  res.json(db.team);
});

app.get('/api/content', (req, res) => {
  const db = readDB();
  res.json(db.siteContent);
});

app.post('/api/contact', (req, res) => {
  const db = readDB();
  db.messages = db.messages || [];
  const message = {
    id: 'msg' + genId(),
    name: req.body.name || '',
    email: req.body.email || '',
    department: req.body.department || '',
    message: req.body.message || '',
    createdAt: new Date().toISOString(),
    sentTo: 'sacbuild2@gmail.com'
  };
  db.messages.unshift(message);
  writeDB(db);
  res.json({ success: true, message });
});

// ============ AUTH ============

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.authenticated = true;
    res.json({ success: true, token: ADMIN_TOKEN });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

app.get('/api/admin/check', (req, res) => {
  res.json({ authenticated: isAuthenticated(req) });
});

// ============ ADMIN - EVENTS ============

app.post('/api/admin/events', requireAuth, upload.single('image'), (req, res) => {
  const db = readDB();
  const { title, date, category, description, tags, status } = req.body;
  const event = {
    id: 'evt' + genId(),
    title, date, category, description,
    status: status || 'upcoming',
    image: req.file ? '/uploads/' + req.file.filename : '',
    tags: tags ? tags.split(',').map(t => t.trim()) : []
  };
  db.events.unshift(event);
  writeDB(db);
  res.json(event);
});

app.put('/api/admin/events/:id', requireAuth, upload.single('image'), (req, res) => {
  const db = readDB();
  const idx = db.events.findIndex(e => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const { title, date, category, description, tags, status } = req.body;
  db.events[idx] = {
    ...db.events[idx], title, date, category, description,
    status: status || db.events[idx].status || 'upcoming',
    tags: tags ? tags.split(',').map(t => t.trim()) : db.events[idx].tags,
    image: req.file ? '/uploads/' + req.file.filename : db.events[idx].image
  };
  writeDB(db);
  res.json(db.events[idx]);
});

app.delete('/api/admin/events/:id', requireAuth, (req, res) => {
  const db = readDB();
  db.events = db.events.filter(e => e.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ============ ADMIN - PROJECTS ============

app.post('/api/admin/projects', requireAuth, (req, res) => {
  const db = readDB();
  const { title, domain, description, tech, status } = req.body;
  const project = {
    id: 'prj' + genId(),
    title, domain, description, status,
    tech: toList(tech)
  };
  db.projects.unshift(project);
  writeDB(db);
  res.json(project);
});

app.put('/api/admin/projects/:id', requireAuth, (req, res) => {
  const db = readDB();
  const idx = db.projects.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const { title, domain, description, tech, status } = req.body;
  db.projects[idx] = {
    ...db.projects[idx],
    title,
    domain,
    description,
    status,
    tech: toList(tech)
  };
  writeDB(db);
  res.json(db.projects[idx]);
});

app.delete('/api/admin/projects/:id', requireAuth, (req, res) => {
  const db = readDB();
  db.projects = db.projects.filter(p => p.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ============ ADMIN - TEAM ============

app.post('/api/admin/team', requireAuth, upload.single('avatar'), (req, res) => {
  const db = readDB();
  const { name, role, year, dept, bio } = req.body;
  const member = {
    id: 'tm' + genId(),
    name,
    role,
    year,
    dept,
    bio,
    avatar: req.file ? '/uploads/' + req.file.filename : ''
  };
  db.team.push(member);
  writeDB(db);
  res.json(member);
});

app.put('/api/admin/team/:id', requireAuth, upload.single('avatar'), (req, res) => {
  const db = readDB();
  const idx = db.team.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const { name, role, year, dept, bio } = req.body;
  db.team[idx] = {
    ...db.team[idx],
    name,
    role,
    year,
    dept,
    bio,
    avatar: req.file ? '/uploads/' + req.file.filename : db.team[idx].avatar
  };
  writeDB(db);
  res.json(db.team[idx]);
});

app.delete('/api/admin/team/:id', requireAuth, (req, res) => {
  const db = readDB();
  db.team = db.team.filter(t => t.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ============ ADMIN - CONTENT ============

app.put('/api/admin/content', requireAuth, (req, res) => {
  const db = readDB();
  db.siteContent = { ...db.siteContent, ...req.body };
  writeDB(db);
  res.json(db.siteContent);
});

app.put('/api/admin/data', requireAuth, (req, res) => {
  const current = readDB();
  const next = {
    ...current,
    ...req.body,
    messages: current.messages || []
  };
  writeDB(next);
  res.json(next);
});

app.post('/api/admin/media', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Image required' });
  res.json({ url: '/uploads/' + req.file.filename });
});

app.get('/api/admin/messages', requireAuth, (req, res) => {
  const db = readDB();
  res.json(db.messages || []);
});

// ============ ADMIN - GALLERY ============

app.post('/api/admin/gallery', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Image required' });
  const db = readDB();
  db.gallery = db.gallery || [];
  const item = {
    id: 'gal' + genId(),
    title: req.body.title || 'Club photo',
    category: req.body.category || req.body.title || 'Club Highlights',
    image: '/uploads/' + req.file.filename,
    featured: req.body.featured === 'true'
  };
  db.gallery.unshift(item);
  writeDB(db);
  res.json(item);
});

app.put('/api/admin/gallery/:id', requireAuth, upload.single('image'), (req, res) => {
  const db = readDB();
  db.gallery = db.gallery || [];
  const idx = db.gallery.findIndex(g => g.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  db.gallery[idx] = {
    ...db.gallery[idx],
    title: req.body.title || db.gallery[idx].title,
    category: req.body.category || db.gallery[idx].category || db.gallery[idx].title,
    featured: req.body.featured === 'true',
    image: req.file ? '/uploads/' + req.file.filename : db.gallery[idx].image
  };
  writeDB(db);
  res.json(db.gallery[idx]);
});

app.delete('/api/admin/gallery/:id', requireAuth, (req, res) => {
  const db = readDB();
  db.gallery = (db.gallery || []).filter(g => g.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// Serve admin dashboard
app.use('/admin', express.static(path.join(__dirname, '../frontend')));
app.use('/', express.static(path.join(__dirname, '../frontend')));

app.listen(PORT, () => {
  console.log(`🚀 Build Club server running on http://localhost:${PORT}`);
  console.log(`📊 Admin dashboard: http://localhost:${PORT}/admin.html`);
});
