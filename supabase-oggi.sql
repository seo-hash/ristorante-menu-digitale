-- Rimuovi descrizione da tutti i giorni
UPDATE menu_items SET description = NULL WHERE category = 'Menu Dipendente';
