update Shelfie
set name = $1, price = $2
where id = $3

returning *;