-- Aggiungi 'employee' al constraint CHECK
ALTER TABLE category_order DROP CONSTRAINT IF EXISTS category_order_section_type_check;
ALTER TABLE category_order ADD CONSTRAINT category_order_section_type_check CHECK (section_type IN ('ala_carte', 'weekly', 'buffet', 'employee'));

-- Elimina vecchi dati Menu Dipendente se esistono
DELETE FROM menu_items WHERE category = 'Menu Dipendente';
DELETE FROM category_order WHERE name = 'Menu Dipendente';

-- Inserisci nuovo Menu Dipendente
INSERT INTO category_order (name, section_type, base_price, "order") VALUES
  ('Menu Dipendente', 'employee', NULL, 13);

INSERT INTO menu_items (category, name, description, price, day) VALUES
  ('Menu Dipendente', 'Crudo e melone', 'Menu definitivo disponibile dal pomeriggio', 0, 'Lunedì'),
  ('Menu Dipendente', 'Piatto Iside: crostino di pane di segale, salmone mais e avocado', 'Menu definitivo disponibile dal pomeriggio', 0, 'Martedì'),
  ('Menu Dipendente', 'Insalata di riso con tonno', 'Menu definitivo disponibile dal pomeriggio', 0, 'Mercoledì'),
  ('Menu Dipendente', 'Pollo al pane saporito e insalata di ciliegino', 'Menu definitivo disponibile dal pomeriggio', 0, 'Giovedì'),
  ('Menu Dipendente', 'Pinsa con mozzarella e prosciutto cotto all''uscita', 'Menu definitivo disponibile dal pomeriggio', 0, 'Venerdì');

-- Sposta Vini, Cocktail, Bevande di un ordine
UPDATE category_order SET "order" = 14 WHERE name = 'Vini';
UPDATE category_order SET "order" = 15 WHERE name = 'Cocktail';
UPDATE category_order SET "order" = 16 WHERE name = 'Bevande';
