-- Crea la tabella menu_items
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crea la tabella category_order
CREATE TABLE category_order (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('cibo', 'vini')),
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Abilita accesso pubblico in lettura (per il menu dei clienti)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_order ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chiunque può leggere il menu"
  ON menu_items FOR SELECT
  USING (true);

DO $$ BEGIN
  CREATE POLICY "Chiunque può leggere le categorie"
    ON category_order FOR SELECT
    USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- Solo gli utenti autenticati possono modificare il menu
CREATE POLICY "Utenti autenticati possono inserire menu_items"
  ON menu_items FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Utenti autenticati possono aggiornare menu_items"
  ON menu_items FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Utenti autenticati possono eliminare menu_items"
  ON menu_items FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Utenti autenticati possono inserire category_order"
  ON category_order FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Utenti autenticati possono aggiornare category_order"
  ON category_order FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Utenti autenticati possono eliminare category_order"
  ON category_order FOR DELETE
  USING (auth.role() = 'authenticated');

-- Crea un indice per ordinare per categoria e nome
CREATE INDEX idx_menu_items_category_name ON menu_items (category, name);

-- Inserisci dati di esempio per le categorie
INSERT INTO category_order (name, type, "order") VALUES
  ('Antipasti', 'cibo', 0),
  ('Primi', 'cibo', 1),
  ('Secondi', 'cibo', 2),
  ('Contorni', 'cibo', 3),
  ('Dolci', 'cibo', 4),
  ('Vini Rossi', 'vini', 0),
  ('Vini Bianchi', 'vini', 1);

-- Inserisci alcuni dati di esempio per i piatti
INSERT INTO menu_items (category, name, description, price, available) VALUES
  ('Antipasti', 'Bruschetta al Pomodoro', 'Pane tostato con pomodori freschi, basilico e olio EVO', 6.50, true),
  ('Antipasti', 'Tagliere Misto', 'Selezione di salumi e formaggi locali', 14.00, true),
  ('Primi', 'Spaghetti alla Carbonara', 'Guanciale, pecorino romano, uova e pepe nero', 12.00, true),
  ('Primi', 'Risotto ai Funghi', 'Riso carnaroli con funghi porcini e tartufo', 14.00, true),
  ('Secondi', 'Tagliata di Manzo', 'Con rucola, grana e aceto balsamico', 18.00, true),
  ('Secondi', 'Branzino al Forno', 'Con patate e olive taggiasche', 16.00, true),
  ('Contorni', 'Insalata Mista', 'Insalata mista di stagione', 5.00, true),
  ('Contorni', 'Patate al Forno', 'Patate al forno con rosmarino', 4.00, true),
  ('Dolci', 'Tiramisù', 'Classico della casa', 6.00, true),
  ('Dolci', 'Panna Cotta', 'Con coulis di frutti di bosco', 5.50, true),
  ('Vini Rossi', 'Chianti Classico DOCG', 'Bottiglia 750ml', 18.00, true),
  ('Vini Rossi', 'Brunello di Montalcino', 'Bottiglia 750ml', 45.00, true),
  ('Vini Bianchi', 'Pinot Grigio', 'Bottiglia 750ml', 15.00, true),
  ('Vini Bianchi', 'Vermentino di Sardegna', 'Bottiglia 750ml', 16.00, true);
