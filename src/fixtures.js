// r.db('blog').table('users').filter({name: 'Michel'})

export let reql = (
  [
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
  ]
)


// r.db('blog').table('users')
export let simple =
  [
    15,
    [
      [
        14,
        ['blog']
      ],
      'users'
    ]
  ];

let proto = {
  DB: 14,
  TABLE: 15,
  FILTER: 39,
  DATUM: 1,
}

export let real = [39,[[15,[[14,["blog"]],"users"]],{"name":"Michel"}]]
// export let real = [1,[39,[[15,[[14,["blog"]],"users"]],[69,[[2,[15]],[10,[15]]]]]],{"binary_format":"raw","time_format":"raw","profile":false}];

