const db = require('../lib/dbConnect');

function getAllPuppies(req, res, next) {

  db.any(`SELECT * from puppies
          ORDER BY name;`)
    .then((puppies) => {
      res.puppies = puppies;
      next();
    })
    .catch(error => next(error));
}

function adoptPuppy(req, res, next) {
  db.none(`INSERT INTO puppies (name, url)
          VALUES ($/name/, $/url/);`, req.body)
    .then( () => next());
}

function abandonPuppy(req, res, next) {
  db.none(`DELETE FROM puppies
          WHERE id = $/puppy/;`, req.body)
    .then( () => next());
}

function likePuppy(req, res, next) {
  db.none(`UPDATE puppies
          SET likes = likes + 1
          WHERE puppies.id = $/puppy/;`, req.body)
    .then( () => next());
  // Implement increasing the likes value of the puppy by one
}

module.exports = {
  getAllPuppies,
  adoptPuppy,
  abandonPuppy,
  likePuppy
};
