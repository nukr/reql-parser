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

// export let real = [1,[35,[[51,[[38,[[150,[[144,[[33,[[15,[[14,["rethinkdb"]],"table_config"]],"db","name"]],"db"]]]],[69,[[2,[0]],[2,[[170,[[10,[0]],"group"]],[41,[[170,[[170,[[10,[0]],"reduction"]],"name"]],[69,[[2,[1]],[10,[1]]]]]]]]]]]],"OBJECT"]],[143,["rethinkdb",[51,[[62,[[14,["rethinkdb"]]]],"ARRAY"]]]]]]]
export let real = [1,[39,[[15,[[14,["blog"]],"users"]],{"name":"Michel"}]],{"binary_format":"raw","time_format":"raw","profile":false}]
