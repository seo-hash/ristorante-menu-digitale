-- Prezzo unico per Menu Proteico e Menu Dipendente
UPDATE category_order SET base_price = 5.50 WHERE name = 'Menu Proteico';
UPDATE category_order SET base_price = 5.50 WHERE name = 'Menu Dipendente';
