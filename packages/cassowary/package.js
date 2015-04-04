Npm.depends({
  'cassowary': '0.0.2'
});

Package.on_use(function (api) {
  api.add_files('cassowary.js', 'server');
  api.export('Cassowary')
});