const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  username: String,
  name: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  repos.forEach(repo => {
    // works on refresh only
    // Repo.findOne({ id: repo.id }, (err, match) => {
    //   if (err) {
    //     console.log(err);
    //   }

    //   if (match) {
    //     console.log('duplicate detected');
    //   } else {
    //     let instance = new Repo({
    //       id: repo.id,
    //       username: repo.owner.login,
    //       name: repo.name,
    //       url: repo.html_url,
    //       forks: repo.forks
    //     });

    //     instance.save()
    //   }
    // });

    var filter = {
      id: repo.id,
      username: repo.owner.login,
      name: repo.name,
      url: repo.html_url,
    };

    var update = {
      forks: repo.forks
    };

    Repo.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true
    })
      .then(doc => {
        if (JSON.stringify(repo) === JSON.stringify(repos[repos.length - 1])) {
          callback();
        }
      })
      .catch(err => console.log(err));
  });
}

let retrieve = (callback) => {
  Repo.find({}, (err, repos) => {
    if (err) {
      console.log(err);
    } else {
      callback(repos);
    }
  }).sort({ forks: -1 });
}

module.exports.save = save;
module.exports.retrieve = retrieve;