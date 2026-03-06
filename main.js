import { Tree } from "./BinarySearchTree.js";

let newTree = new Tree([4,5,8,1,4,9,0,8,4,2,6,3]);
console.log(newTree.includes(8));
console.log(newTree.insert(10));
console.log(newTree.insert(5));
console.log(newTree.insert(7));
console.log(newTree.insert(11));
newTree.deleteItem(0);
newTree.deleteItem(8);
newTree.prettyPrint();
newTree.levelOrderForEach((item)=>{
    console.log(`from levelOrder ${item}`)
});
newTree.preOrderForEach((item)=>{
    console.log(`from preOrder ${item}`)
})
newTree.inOrderForEach((item)=>{
    console.log(`from inOrder ${item}`)
})
newTree.postOrderForEach((item)=>{
    console.log(`from postOrder ${item}`)
})

console.log(newTree.height(4));
console.log(newTree.depth(4));
console.log(newTree.height(6));
console.log(newTree.depth(6));
console.log(newTree.height(11));
console.log(newTree.depth(11));
console.log(newTree.isBalanced());
