def random_car_from_db(db)
    result = db.execute "SELECT * FROM cars ORDER BY RANDOM() LIMIT 1"
    result[0]
end

def db_car_to_table(ref)
    car = {}
    car["year"] = ref[1]
    car["make"] = ref[2]
    car["model"] = ref[3]
    car["filename"] = ref[4]
    car
end