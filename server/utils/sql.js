export const getItemReq = `
  SELECT 
      items.*, 
      item_groups.name AS group_name, 
      measure_units.unit AS measure_unit 
  FROM 
      items 
  INNER JOIN 
      item_groups ON items.group_id = item_groups.id 
  INNER JOIN 
      measure_units ON items.measure_unit_id = measure_units.id 
  WHERE 
      items.id = ?;
`

export const userOrdersReq = `
  SELECT 
      requests.*, 
      items.name AS item_name, 
      statuses.status AS order_status, 
      measure_units.unit AS measure_unit 
        FROM 
            requests 
        INNER JOIN 
            items 
        ON 
            items.id = requests.item_id 
        INNER JOIN 
            statuses 
        ON 
            statuses.id = requests.status_id 
        INNER JOIN 
            measure_units ON items.measure_unit_id = measure_units.id 
        WHERE 
            requests.user_id = ?;
`

export const createOrderReq = `
    INSERT INTO
      requests(item_id, user_id, employee_name, measure, measure_unit_id, quantity, price, comment)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?);
      `

export const getOrderReq = `
  SELECT 
        requests.*, 
        items.name AS item_name, 
        measure_units.unit AS measure_unit, 
        statuses.status AS order_status, 
        users.username AS username
    FROM 
        requests 
    INNER JOIN 
        items ON requests.item_id = items.id 
    INNER JOIN 
        statuses ON requests.status_id = statuses.id 
    INNER JOIN 
        users ON requests.user_id = users.id 
    INNER JOIN 
        measure_units ON items.measure_unit_id = measure_units.id
    WHERE 
        requests.id = ?;
`

export const editItemReq = `
  UPDATE items SET 
         name = ?, 
         group_id = ?, 
         measure = ?, 
         measure_unit_id = ?, 
         quantity = ?, 
         default_quantity = ?, 
         price = ?, 
         storage_location = ?, 
         contacts = ?, 
         status = ?
  WHERE id = ?
`

export const newItemReq = `
  INSERT INTO
      items (name, group_id, measure, measure_unit_id, quantity, default_quantity, price, status, storage_location, contacts)
  VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`

export const getAllItems = `
    SELECT 
        items.*, 
        item_groups.name AS group_name, 
        measure_units.unit AS measure_unit 
    FROM 
        items 
    INNER JOIN 
        item_groups ON items.group_id = item_groups.id 
    INNER JOIN 
        measure_units ON items.measure_unit_id = measure_units.id;
    `

export const getAllRequestsReq = `
    SELECT 
        requests.*, 
        items.name AS item_name, 
        measure_units.unit AS measure_unit, 
        statuses.status AS order_status, 
        users.username AS username
    FROM 
        requests 
    INNER JOIN 
        items ON requests.item_id = items.id 
    INNER JOIN 
        statuses ON requests.status_id = statuses.id 
    INNER JOIN 
        users ON requests.user_id = users.id 
    INNER JOIN 
        measure_units ON items.measure_unit_id = measure_units.id;
    `