const Toilets = require("../models/toilets");

const toiletMapper = (rawToilet) => {
    if (!rawToilet) {
        return null;
    }
    const {
        title,
        location,
        description,
        author,
        address,
    } = rawToilet;

    const toilet = new Toilets();
    toilet.title = title || "Туалет";
    toilet.location = location;
    toilet.description = description || null;
    toilet.author = author || "Freebee";
    toilet.address = address;

    return toilet;
};

module.exports.getToilets = (req, res) => {
    Toilets.find()
    .limit(500)
    .exec((err, toilets) => {
        if (err) {
            return res.status(500);
        } else {
            return res.status(200).json(toilets);
        }
    });
};

module.exports.createToilets = (req, res) => {
    const toilets = req.body.data || [];
    const transformedToilets = toilets.map((toilet) => toiletMapper(toilet));

    Toilets.create(transformedToilets, (err, savedToilets) => {
        if (err) {
            return res.status(500).json({ message: "Could not save toilets." });
        } else {
            return res.status(201).json(savedToilets);
        }
    });
}
