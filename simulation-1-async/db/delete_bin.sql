DELETE FROM Shelfie
WHERE shelf_letter = $1 
AND bin_number = $2;