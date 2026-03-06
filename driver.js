import { Tree } from "./BinarySearchTree.js";

function generateRandomNum(size = 10){
let arr = [];
for(let i=0;i<size;i++){
    arr.push(Math.floor(Math.random()*100))
}
return arr;
}

const array = generateRandomNum(15);
const tree = new Tree(array);
console.log(tree.isBalanced());

tree.insert(123);
tree.insert(110);
tree.insert(190);

console.log(tree.isBalanced());
tree.prettyPrint();
tree.rebalance();
console.log(tree.isBalanced());
tree.levelOrderForEach((item)=>{
    console.log(item)
});
tree.preOrderForEach((item)=>{
    console.log(item)
});
tree.postOrderForEach((item)=>{
    console.log(item)
});
tree.inOrderForEach((item)=>{
    console.log(`${item} Inorder`)
});
