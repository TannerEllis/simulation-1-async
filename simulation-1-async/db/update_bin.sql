update Shelfie
set name = $1, price = $2
where shelf_letter = $3 
and bin_number = $4

returning *;