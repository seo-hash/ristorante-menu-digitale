-- Aggiungi nuove categorie per Croissant, Crostata, Toast
INSERT INTO category_order (name, section_type, base_price, "order") VALUES
  ('Croissant', 'ala_carte', NULL, 6),
  ('Crostata', 'ala_carte', NULL, 7),
  ('Toast', 'ala_carte', NULL, 8);

-- Inserisci i singoli gusti Croissant
INSERT INTO menu_items (category, name, description, price, day) VALUES
  ('Croissant', 'Vuoto', NULL, 1.50, NULL),
  ('Croissant', 'Gocce al cioccolato', NULL, 1.50, NULL),
  ('Croissant', 'Cereali e miele', NULL, 1.50, NULL),
  ('Croissant', 'Treccia alle noci', NULL, 1.50, NULL);

-- Elimina il vecchio item Croissant da Bar & Colazione
DELETE FROM menu_items WHERE category = 'Bar & Colazione' AND name = 'Croissant' AND description IS NOT NULL;

-- Inserisci i singoli gusti Crostata
INSERT INTO menu_items (category, name, description, price, day) VALUES
  ('Crostata', 'Al cioccolato', NULL, 2.50, NULL),
  ('Crostata', 'Albicocca', NULL, 2.50, NULL),
  ('Crostata', 'Ciliegia', NULL, 2.50, NULL);

-- Elimina il vecchio item Crostata da Bar & Colazione
DELETE FROM menu_items WHERE category = 'Bar & Colazione' AND name = 'Crostata' AND description IS NOT NULL;

-- Inserisci i singoli Toast
INSERT INTO menu_items (category, name, description, price, day) VALUES
  ('Toast', 'Prosciutto cotto e formaggio', NULL, 2.50, NULL),
  ('Toast', 'Prosciutto crudo e formaggio', NULL, 2.50, NULL),
  ('Toast', 'Bresaola, formaggio e scaglie di grana', NULL, 2.50, NULL),
  ('Toast', 'Uovo, formaggio, lattuga e pomodoro', NULL, 2.50, NULL),
  ('Toast', 'Tacchino, formaggio, lattuga e pomodoro', NULL, 2.50, NULL),
  ('Toast', 'Supplemento', NULL, 1.00, NULL);

-- Elimina il vecchio item Toast da Bar & Colazione
DELETE FROM menu_items WHERE category = 'Bar & Colazione' AND name = 'Toast' AND description IS NOT NULL;

-- Aggiorna ordini delle categorie esistenti
UPDATE category_order SET "order" = 5 WHERE name = 'Bar & Colazione';
UPDATE category_order SET "order" = 9 WHERE name = 'Piadine';
UPDATE category_order SET "order" = 10 WHERE name = 'Dolci';
UPDATE category_order SET "order" = 11 WHERE name = 'Menu Proteico';
UPDATE category_order SET "order" = 12 WHERE name = 'Young Menu';
UPDATE category_order SET "order" = 13 WHERE name = 'Vini';
UPDATE category_order SET "order" = 14 WHERE name = 'Cocktail';
UPDATE category_order SET "order" = 15 WHERE name = 'Bevande';

-- Menu Dipendente
INSERT INTO category_order (name, section_type, base_price, "order") VALUES
  ('Menu Dipendente', 'weekly', NULL, 13);

INSERT INTO menu_items (category, name, description, price, day) VALUES
  ('Menu Dipendente', 'Piatto del giorno', 'Menu definitivo disponibile dal pomeriggio', 8.50, 'Lunedì'),
  ('Menu Dipendente', 'Piatto del giorno', 'Menu definitivo disponibile dal pomeriggio', 8.50, 'Martedì'),
  ('Menu Dipendente', 'Piatto del giorno', 'Menu definitivo disponibile dal pomeriggio', 8.50, 'Mercoledì'),
  ('Menu Dipendente', 'Piatto del giorno', 'Menu definitivo disponibile dal pomeriggio', 8.50, 'Giovedì'),
  ('Menu Dipendente', 'Piatto del giorno', 'Menu definitivo disponibile dal pomeriggio', 8.50, 'Venerdì');

-- Aggiorna Vini, Cocktail, Bevande dopo l'inserimento di Menu Dipendente
UPDATE category_order SET "order" = 14 WHERE name = 'Vini';
UPDATE category_order SET "order" = 15 WHERE name = 'Cocktail';
UPDATE category_order SET "order" = 16 WHERE name = 'Bevande';
