const Item = require('../models/item.js');
const getUser = require('../utils.js').getUser;

exports.index = function (req, res) 
{
    getUser(req).then(user => 
    {
        if (!user)
            return res.json({errors: "Unauthorized", code: 490});
        res.json(user.items.map(a => ({
            id: a._id,
            type: a.type,
            description: a.description,
            value: a.value
            })));
    }).catch(e => res.json({errors: "Unauthorized", code: 490}));
};
// Add new item
exports.new = function (req, res) 
{
    if (!req.body)
        return res.json(
        {
            errors: "Bad request! Supply POST data: item type, description and value",
            code: 401
        })
    getUser(req).then(user => 
    {
        if (!user)
            return res.json({errors: "Unauthorized", code: 490});

        const item = new Item();
        item.type = req.body.type || "";
        item.description = req.body.description || "";
        item.value = req.body.value || 0;
        user.items.push(item);
        user.save(err =>
        {
            if (err)
               return res.json(err);
            res.json({
                message: 'Item added successfully',
                data: 
                {
                    id: item._id,
                    type: item.type,
                    description: item.description,
                    value: item.value
                }
            });
        });
    }).catch(e => res.json({errors: "Unauthorized", code: 490}));
};
// Update item
exports.update = function (req, res) 
{
    if (!req.body || !req.body.item_id)
        return res.json(
        {
            errors: "Bad request! Supply PUT/PATCH data: item id",
            code: 401
        })
    getUser(req).then(user => 
    {
        if (!user)
            return res.json({errors: "Unauthorized", code: 490});

        const item = user.items.find(a => a._id == req.body.item_id);

        if (!item)
            return res.json({errors: "Bad request. Provide correct update details", code: 492});

        item.type = req.body.type || item.type;
        item.description = req.body.description || item.description;
        item.value = req.body.value || item.value;
        user.markModified('items');
        user.save(err =>
        {
            if (err)
               return res.json(err);
            res.json({
                message: 'Item updated successfully',
                data: 
                {
                    id: item._id,
                    type: item.type,
                    description: item.description,
                    value: item.value
                }
            });
        });
    }).catch(e => res.json({errors: "Unauthorized", code: 490}));
};
// Handle delete items
exports.delete = function (req, res) 
{
    if (!req.body)
        return res.json(
        {
            errors: "Bad request! Supply POST data: item type, description and value",
            code: 401
        })
    getUser(req).then(user => 
    {
        if (!user)
            return res.json({errors: "Unauthorized", code: 490});

        user.items = user.items.filter(a => a._id != req.body.item_id);
        user.markModified('items');
        user.save(err =>
        {
            if (err)
               return res.json(err);
            Item.deleteOne({_id: req.body.item_id}, (err, items) => 
            {
                if (err)
                    return res.json(err);
                res.json(
                {
                    message: 'Item deleted successfully',
                    newItemsCount: user.items.length
                });
            });
        });
    })
};