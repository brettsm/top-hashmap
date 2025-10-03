class HashMap {

    loadFactor = 0.75;
    capacity = 16;

    constructor(capacity = 16, loadFactor = 0.75) { 
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);
        const node = new Node(key, value);

        if (this.buckets[hashCode] === null) {
            this.buckets[hashCode] = node;
            this.size++;
        } else {
            let cur = this.buckets[hashCode];
            let prev = null;
            while (cur) {
                if (cur.key === key) {
                    cur.value = value;
                    return true;
                }
                prev = cur;
                cur = cur.next;
            }
            prev.next = node;
            this.size++;
        }

        if (this.size / this.capacity > this.loadFactor) 
            this._resize(this.capacity * 2); 
        
        return true;
    }

    get(key) {
        const hashCode = this.hash(key);
        let cur = this.buckets[hashCode];

        while(cur) {
            if(cur.key === key) 
                return cur.val;
        
            cur = cur.next;
        }
        
        return null;
    }

    _resize(newCap) {
        const oldBuckets = this.buckets;
        this.capacity = newCap;
        this.buckets = new Array(this.capacity).fill(null);

        for (let head of oldBuckets) {
            let node = head;
            while(node) {
                const next = node.next;
                const hashCode = hash(node.key);
                node.next = this.buckets[hashCode];
                this.buckets[hashCode] = node;
                node = next;
            }
        }
    }
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}