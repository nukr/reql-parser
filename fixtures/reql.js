// r.db('blog').table('users').filter({name: 'Michel'})
let reql = [
  39,
  [
    [
      15,
      [
        [
          14,
          ["blog"]
        ],
        "users"
      ]
    ],
    {"name": "Michel"}
  ]
];


// r.db('blog').table('users')
let simple = [
  15,
  [
    [
      14,
      ['blog']
    ],
    'users'
  ]
];

export {reql}
