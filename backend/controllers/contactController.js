import conn from "../config/db.js"

// @desc    get contact
// @route   GET /api/contacts
// @access  Public
export const get_contact = (req, res, next) => {
    const query = "SELECT `id`, `first_name`, `last_name`, `email`, `phone_number`, `company`, `job_title` FROM contacts"
    conn.query(query, (err, data)=> {
        if(err) next(err)
        else return res.status(200).json({"success": true,"data": data})
    })
}

// @desc    create contact
// @route   POST /api/contacts
// @access  Public
export const create_contact = (req, res, next) => {
    const contact = req.body
    console.log(contact)
    const query =  "INSERT INTO contacts SET ?";
    conn.query(query, contact, (err, data) => {
        if(err) next(err)
        else return res.status(201).json({success: true, data})
    })
}

// @desc    update contact
// @route   PUT /api/contacts/:id
// @access  Public
export const update_contact = (req, res, next) => {
    const id = req.params.id;
    const updated_json = req.body
    const query = "UPDATE contacts SET ? WHERE id = ?";
    conn.query(query, [updated_json, id], (err, data) => {
        if(err) next(err)
        else return res.status(200).json({success: true, data})
    })
}

// @desc    delete contact
// @route   POST /api/contacts/:id
// @access  Public
export const delete_contact = (req, res, next) => {
    const id = req.params.id;
    const query = "DELETE FROM contacts WHERE id = ?";
    conn.query(query, id, (err, data) => {
        if(err) next(err)
        else return res.status(200).json({success: true, data})
    })
}
