const config = {
  'import/default': ['error'],
  'import/export': ['error'],
  'import/exports-last': ['error'],
  'import/first': ['error'],
  'import/group-exports': ['error'],
  'import/named': ['error'],
  'import/namespace': ['error'],
  'import/no-extraneous-dependencies': ['error'],
  'import/no-unresolved': ['error', { commonjs: true, ignore: ['unpkg'] }],
  'import/no-named-as-default': ['error'],
  'import/no-named-as-default-member': ['error'],
  'import/no-duplicates': ['error']
};

module.exports = config;
