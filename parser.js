import protodef from './protodef';

let reql =
  [1,
    [39,
      [
        [15,
          [
            [14, ['blog']],
            'users'
          ]
        ],
        {'name': 'Michel'}
      ]
    ],
    {'binary_format': 'raw', 'time_format': 'raw', 'profile': false}
  ];

let simple =
  [15,
    [
      [14, ['blog']],
      'users'
    ]
  ];

class BinaryTree {
  constructor (value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  postorder (f) {
    this.walk(f, ['left', 'right', 'this']);
  }

  preorder (f) {
    this.walk(f, ['this', 'left', 'right']);
  }

  walk (func, order) {
    for (let i in order)
      switch (order[i]) {
        case 'this': func(this.value); break;
        case 'left': if (this.left) this.left.walk(func, order); break;
        case 'right': if (this.right) this.right.walk(func, order); break;
      }
  }
}

let createBinaryTreeFromArray = (ary) => {
    var left = null, right = null;
    if (ary[1]) left = createBinaryTreeFromArray(ary[1]);
    if (ary[2]) right = createBinaryTreeFromArray(ary[2]);
    return new BinaryTree(ary[0], left, right);
};

let tree = createBinaryTreeFromArray([1, [2, [4, [7]], [5]], [3, [6, [8], [9]]]]);

console.log('*** postorder ***');
tree.postorder(console.log);

