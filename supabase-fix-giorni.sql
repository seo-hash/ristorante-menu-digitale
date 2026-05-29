DELETE FROM menu_items WHERE category = 'Menu Dipendente';

INSERT INTO menu_items (category, name, description, price, day) VALUES
  ('Menu Dipendente', 'Crudo e melone', NULL, 0, 'Lunedì'),
  ('Menu Dipendente', 'Piatto Iside: crostino di pane di segale, salmone mais e avocado', NULL, 0, 'Martedì'),
  ('Menu Dipendente', 'Insalata di riso con tonno', NULL, 0, 'Mercoledì'),
  ('Menu Dipendente', 'Pollo al pane saporito e insalata di ciliegino', NULL, 0, 'Giovedì'),
  ('Menu Dipendente', 'Pinsa con mozzarella e prosciutto cotto all''uscita', NULL, 0, 'Venerdì');
