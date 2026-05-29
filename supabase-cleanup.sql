-- Elimina duplicati di Menu Dipendente in category_order
DELETE FROM category_order WHERE name = 'Menu Dipendente';
INSERT INTO category_order (name, section_type, base_price, "order") VALUES
  ('Menu Dipendente', 'employee', NULL, 13);

-- Elimina tutti i vecchi item e reinserisci
DELETE FROM menu_items WHERE category = 'Menu Dipendente';

INSERT INTO menu_items (category, name, description, price, day) VALUES
  ('Menu Dipendente', 'Crudo e melone', 'Menu definitivo disponibile dal pomeriggio', 0, 'Lunedì'),
  ('Menu Dipendente', 'Piatto Iside: crostino di pane di segale, salmone mais e avocado', 'Menu definitivo disponibile dal pomeriggio', 0, 'Martedì'),
  ('Menu Dipendente', 'Insalata di riso con tonno', 'Menu definitivo disponibile dal pomeriggio', 0, 'Mercoledì'),
  ('Menu Dipendente', 'Pollo al pane saporito e insalata di ciliegino', 'Menu definitivo disponibile dal pomeriggio', 0, 'Giovedì'),
  ('Menu Dipendente', 'Pinsa con mozzarella e prosciutto cotto all''uscita', 'Menu definitivo disponibile dal pomeriggio', 0, 'Venerdì');

-- Aggiorna ordini
UPDATE category_order SET "order" = 14 WHERE name = 'Vini';
UPDATE category_order SET "order" = 15 WHERE name = 'Cocktail';
UPDATE category_order SET "order" = 16 WHERE name = 'Bevande';
