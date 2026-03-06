class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(arr) {
        this.root = this.#buildTree(arr);
    }

    #buildTree(arr) {
        let sortedArr = [...arr].sort((a, b) => a - b);
        const uniqueAndSortedArr = [...new Set(sortedArr)];

        return this.#_buildTree(uniqueAndSortedArr, 0, uniqueAndSortedArr.length - 1);
    }

    #_buildTree(arr, start, end) {
        if (start > end) return null;
        let middle = Math.floor((start + end) / 2);
        let middleNode = new Node(arr[middle]);
        middleNode.left = this.#_buildTree(arr, start, middle - 1);
        middleNode.right = this.#_buildTree(arr, middle + 1, end);

        return middleNode;
    }

    includes(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.data) return true;
            else if (value < current.data) {
                current = current.left;
            } else {
                current = current.right
            }
        }
        return false
    }

    find(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.data) return current;
            else if (value < current.data) {
                current = current.left;
            } else {
                current = current.right
            }
        }
        return undefined
    }

    insert(value) {
        let newNode = new Node(value);
        let current = this.root;

        if (current === null) {
            this.root = newNode;
            return
        };

        while (true) {
            if (value === current.data) return;

            if (value < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    return
                }

                current = current.left
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }

                current = current.right
            }
        }

        // while (current !== null) {
        //     if (value === current.data) return;

        //     if (value < current.data && current.left !== null) {
        //         current = current.left
        //     } else if (value > current.data && current.right !== null) {
        //         current = current.right
        //     }
        //     else break;
        // }

        // if (value < current.data) {
        //     current.left = newNode
        // } else {
        //     current.right = newNode
        // }
    }

    deleteItem(value) {
        this.root = this.#_deleteItem(this.root, value);
    }

    #_deleteItem(node, value) {
        if (node === null) return;

        if (value < node.data) {
            node.left = this.#_deleteItem(node.left, value)
        } else if (value > node.data) {
            node.right = this.#_deleteItem(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                return null
            }

            if (node.left === null) {
                return node.right
            }
            if (node.right === null) {
                return node.left
            }

            const successor = this.#_getSuccessor(node.right);
            node.data = successor.data;
            node.right = this.#_deleteItem(node.right, successor.data);


        }
        return node
    }

    #_getSuccessor(currentNode) {
        while (currentNode.left !== null) {
            currentNode = currentNode.left
        }
        return currentNode
    }

    levelOrderForEach(callback) {
        if (this.root === null) return;

        if (typeof callback !== "function") {
            throw new Error("Call back required!")
        }

        let queue = [];

        queue.push(this.root);

        while (queue.length !== 0) {
            let current = queue.shift();
            callback(current.data);
            if (current.left !== null) {
                queue.push(current.left)
            }
            if (current.right !== null) {
                queue.push(current.right)
            }
        }
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Call back required!")
        }
        this.#_preOrderForEach(callback, this.root);
    }

    #_preOrderForEach(callback, node) {
        if (node === null) return;
        callback(node.data);

        this.#_preOrderForEach(callback, node.left);
        this.#_preOrderForEach(callback, node.right);
    }

    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Call back required!")
        }
        this.#_inOrderForEach(callback, this.root);
    }

    #_inOrderForEach(callback, node) {
        if (node === null) return;
        this.#_inOrderForEach(callback, node.left);
        callback(node.data);
        this.#_inOrderForEach(callback, node.right);
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Call back required!")
        }
        this.#_postOrderForEach(callback, this.root);
    }

    #_postOrderForEach(callback, node) {
        if (node === null) return;
        this.#_postOrderForEach(callback, node.left);
        this.#_postOrderForEach(callback, node.right);
        callback(node.data);
    }

    height(value) {
        let node = this.find(value);
        return this.#_height(node);
    }

    #_height(node) {
        if (node === null) return -1;
        let leftHeight = this.#_height(node.left);
        let rightHeight = this.#_height(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
    }

    depth(value){
        let current = this.root;
        let depth = 0;

        while(current !== null){
            if(value === current.data) return depth;
            if(value < current.data){
                current = current.left;
                depth++
            }else{
                current = current.right;
                depth++
            }
        }
        return undefined
    }

    isBalanced(){
        let result = this.#_isBalanced(this.root);
        if(result === 'unbalanced'){
            return false
        }else{
            return true
        }
    }

    #_isBalanced(node){
        if(node === null) return 0;

        let left = this.#_isBalanced(node.left);
        if(left === "unbalanced") return "unbalanced";

        let right = this.#_isBalanced(node.right);
        if(right === "unbalanced") return "unbalanced";

        if(Math.abs(left - right) > 1) return "unbalanced";

        return 1 + Math.max(left , right);
    }

    rebalance(){
        let array = [];
        this.inOrderForEach((item)=>{
            array.push(item)
        })

        this.root = this.#buildTree(array);
    }

    prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

//[0,1,2,3,4,5,6,7,8]