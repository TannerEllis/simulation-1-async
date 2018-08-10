select * from Shelfie
where shelf_letter = $1
ORDER BY bin_number;